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
      const countries = (await this.countryService.getCountries()) as Country[];
      const usuallyLanguages = [
        "English",
        "Spanish",
        "Chinese",
        "French",
        "Italian",
        "Japanese",
        "Greek",
        "Korean",
        "Arabic",
        "Portuguese",
        "Afrikaans",
        "Others",
      ];
      const languages = countries
        .map((country: Country) => country.languages)
        .filter((l) => l)
        .map((l) => {
          if (!usuallyLanguages.includes(l)) {
            return "Others";
          }
          return l;
        });
      const labels = usuallyLanguages;
      const values = countElementRepeat(languages, usuallyLanguages);
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
