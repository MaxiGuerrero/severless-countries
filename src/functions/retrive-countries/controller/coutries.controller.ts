import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda/trigger/api-gateway-proxy";
import CountryService from "../service/country.service";
import { Filters } from "models/filters";

export default class CountryController {
  constructor(private readonly countryService: CountryService) {}

  async getCountries(query: APIGatewayProxyEventQueryStringParameters | null) {
    try {
      const filters: Filters = query
        ? {
            page: Number(query.page || 0),
            sort: query?.sort || "area",
            sort_dir: (query?.sort_dir as "ASC" | "DESC") || "ASC",
          }
        : {
            page: 0,
            sort: "area",
            sort_dir: "ASC",
          };
      if (filters.page < 0) {
        return "Error-on-query-params";
      }
      return this.countryService.getCountries(filters);
    } catch (error) {
      throw error;
    }
  }
}
