import { APIGatewayProxyHandler } from "aws-lambda";
import { countryController } from "./controller";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const query = event.queryStringParameters;
    const countries = await countryController.getCountries(query);
    return {
      statusCode: 200,
      body: JSON.stringify(countries, null, "\t"),
    };
  } catch (error) {
    throw error;
  }
};
