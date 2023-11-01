import HTTP from "http/axios";
import { config } from "config/config";
import { Country, Filters } from "models/index";

export default class CountryService {
  constructor(private readonly http: HTTP) {}

  async getCountries(filters?: Filters) {
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
      if (!filters) {
        return countries;
      }
      return this.sort(countries, filters);
    } catch (error) {
      console.error("Error on getCountries => ", error);
      throw error;
    }
  }

  private sort(countries: Country[], filters: Filters) {
    const page_size = 20;
    const offset = page_size * filters.page;
    const pages = Math.ceil(countries.length / page_size);
    if (filters.sort_dir === "ASC") {
      countries.sort((a, b) => a[filters.sort] - b[filters.sort]);
    }
    if (filters.sort_dir === "DESC") {
      countries.sort((a, b) => b[filters.sort] - a[filters.sort]);
    }
    return {
      data:
        pages > filters.page
          ? countries.slice(offset, offset + page_size)
          : countries.slice(-page_size),
      page_size,
      page: pages >= filters.page ? filters.page : pages,
    };
  }
}
