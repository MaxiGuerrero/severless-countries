import CountryService from "functions/reports/service/country.service";
import { http } from "http/index";
import ReportService from "./report.service";
import Excel from "../excel/exceljs";
import Chart from "../charts/charts";

const excel = new Excel();
const chart = new Chart();

export const countryService = new CountryService(http);
export const reportService = new ReportService(excel, chart);
