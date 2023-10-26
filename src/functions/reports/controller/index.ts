import { countryService, reportService } from "functions/reports/service/index";
import ReportsController from "functions/reports/controller/report.controller";

export const reportController = new ReportsController(
  countryService,
  reportService
);
