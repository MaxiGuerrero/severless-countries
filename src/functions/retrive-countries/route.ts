import { APIGatewayProxyHandler } from "aws-lambda";
import { countryController } from "./controller";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const countries = await countryController.getCountries();
    return {
      statusCode: 200,
      body: JSON.stringify(countries),
    };
  } catch (error) {
    throw error;
  }
};
