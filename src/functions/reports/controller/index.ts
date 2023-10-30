import { reportService } from "functions/reports/service/index";
import ReportsController from "functions/reports/controller/report.controller";
import { countryService } from "functions/retrive-countries/service";

export const reportController = new ReportsController(
  countryService,
  reportService
);
