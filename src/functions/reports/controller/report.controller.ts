import { Country } from "models/country";
import CountryService from "../../retrive-countries/service/country.service";
import ReportService from "../service/report.service";
import { countElementRepeat } from "utils/countRepeatElements";

export default class ReportsController {
  constructor(
    private readonly countryService: CountryService,
    private readonly reportService: ReportService
  ) {}

  async getReportCountries() {
    try {
      const countries: Country[] = await this.countryService.getCountries();
      const languages = countries
        .map((country: Country) => country.languages)
        .filter((l) => l);
      const labels = [...new Set(languages)];
      const values = countElementRepeat(languages);
      const report = await this.reportService.generateReport(countries, {
        title: "Amount of countries speak a language",
        labels,
        values,
      });
      return report;
    } catch (error) {
      throw error;
    }
  }
}
