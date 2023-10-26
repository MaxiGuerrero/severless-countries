import HTTP from "http/axios";
import { config } from "config/config";
import { Country } from "models/index";

export default class CountryService {
  constructor(private readonly http: HTTP) {}

  async getCountries() {
    try {
      const { data } = await this.http.makeRequest(
        `${config.BASE_URL}/all?fields=area,capital,continents,currencies,languages,name`,
        "get",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const countries: Country[] = data.map((country) => ({
        area: country.area,
        capital: country.capital ? country.capital[0] : undefined,
        continents: country.continents ? country.continents[0] : undefined,
        currencies: country.currencies
          ? country.currencies[Object.keys(country.currencies)[0]]?.name
          : undefined,
        languages: country.languages
          ? country.languages[Object.keys(country.languages)[0]]
          : undefined,
        name: country.name?.common,
      }));
      return countries;
    } catch (error) {
      console.error("Error on getCountries => ", error);
      throw error;
    }
  }
}
