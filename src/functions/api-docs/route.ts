import { APIGatewayProxyHandler } from "aws-lambda";
import { load } from "js-yaml";
import * as fs from "fs";
import * as path from "path";

const data = fs.readFileSync(path.join(__dirname, "swagger.yaml"), "utf-8");

let spec: any = load(data);

spec.servers = [
  { url: process.env.URL || "http://localhost:4000", description: "Default" },
];

const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
    </head>
    <body>
      <div id="swagger"></div>
      <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
      <script>
        SwaggerUIBundle({ dom_id: '#swagger', spec: ${JSON.stringify(spec)} });
      </script>
    </body>
  </html>`;

export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    headers: { "content-type": "text/html" },
    body: html,
  };
};
