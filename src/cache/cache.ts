import AWS from "aws-sdk";
import { splitArray } from "utils/splitArray";
import { v4 as uuidv4 } from "uuid";

export default class Cache {
  cache: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.cache = new AWS.DynamoDB.DocumentClient();
  }

  async set(data: any[], tableName: string) {
    try {
      const currentDate = new Date();
      const fiveDaysLater = new Date(
        currentDate.getTime() + 5 * 24 * 60 * 60 * 1000
      );
      const ttl = Math.floor(fiveDaysLater.getTime() / 1000);
      const items = data.map((d) => ({
        PutRequest: { Item: { id: uuidv4(), ...d, ttl } },
      }));
      // split array in 25 elements
      const itemsChunk = splitArray(items, 25);
      for await (const chunk of itemsChunk) {
        await this.cache
          .batchWrite({
            RequestItems: {
              [`${tableName}`]: chunk,
            },
          })
          .promise();
      }
    } catch (error) {
      console.log("Error in set cache: ", error);
      throw error;
    }
  }

  async get<T>(tableName: string) {
    const result = await this.cache.scan({ TableName: tableName }).promise();
    return (result.Items ?? []) as T[];
  }
}
