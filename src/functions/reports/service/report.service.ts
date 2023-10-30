import { fileToBase64 } from "utils/fileTobase64";
import Chart from "../charts/charts";
import Excel from "../excel/exceljs";

export default class ReportService {
  constructor(private readonly excel: Excel, private readonly chart: Chart) {}

  async generateReport<T extends object>(
    data: T[],
    graphValues: { title: string; values: number[]; labels: string[] }
  ): Promise<"data-not-found" | string> {
    if (data.length <= 0) return "data-not-found";
    const worksheet = this.excel.createWorkSheet("country-report");
    const columnsId = Object.keys(data[0]);
    const columns = columnsId.map((id) => ({
      key: id,
      width: 25,
    }));
    this.excel.generateColumns(worksheet, columns);
    // Generate header table
    const header = columnsId.reduce((obj, id) => {
      obj[id] = id;
      return obj;
    }, {});
    this.excel.insertDataInCell(worksheet, 1, columnsId, header, {
      alignment: { horizontal: "center" },
    });
    // Insert all data
    data.forEach((d, index) => {
      this.excel.insertDataInCell(worksheet, index + 2, columnsId, d, {
        alignment: { horizontal: "center" },
      });
    });
    const pathImage = await this.chart.makeGraph(
      graphValues.values,
      graphValues.title,
      graphValues.labels
    );
    const imageId = this.excel.uploadImage(pathImage);
    this.excel.setImageToWorksheet(worksheet, imageId, "H10:V41");
    const filePath = await this.excel.commitWorkbook("graph");
    return fileToBase64(filePath);
  }
}
