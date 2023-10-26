import { APIGatewayProxyHandler } from "aws-lambda";
import { reportController } from "./controller/index";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const resp = await reportController.getReportCountries();
    if (resp === "data-not-found") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Data not found" }),
      };
    }
    return {
      statusCode: 200,
      body: resp,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="report.xlsx"',
      },
      isBase64Encoded: true,
    };
  } catch (error) {
    throw error;
  }
};
