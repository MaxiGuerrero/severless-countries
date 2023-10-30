import CountryService from "../service/country.service";

export default class CountryController {
  constructor(private readonly countryService: CountryService) {}

  async getCountries() {
    try {
      return this.countryService.getCountries();
    } catch (error) {
      throw error;
    }
  }
}
