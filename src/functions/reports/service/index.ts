import ReportService from "./report.service";
import Excel from "../excel/exceljs";
import Chart from "../charts/charts";

const excel = new Excel();
const chart = new Chart();

export const reportService = new ReportService(excel, chart);
