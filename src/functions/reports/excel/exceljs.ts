import { Column, Style, Worksheet, Workbook } from "exceljs";
import * as path from "path";

export default class Excel {
  workbook: Workbook;

  constructor() {
    this.workbook = new Workbook();
  }

  createWorkSheet(worksheetName: string): Worksheet {
    return this.workbook.addWorksheet(worksheetName);
  }

  generateColumns(worksheet: Worksheet, columns: Partial<Column>[]) {
    worksheet.columns = columns;
  }

  insertDataInCell<T extends object>(
    worksheet: Worksheet,
    rowNumber: number,
    columnIds: string[],
    data: T,
    style: Partial<Style>
  ) {
    const row = worksheet.getRow(rowNumber);
    columnIds.forEach((columnId) => {
      const cell = row.getCell(columnId);
      cell.border = {
        top: { style: "double" },
        bottom: { style: "double" },
        left: { style: "double" },
        right: { style: "double" },
      };
      if (style.font) cell.font = style.font;
      if (style.alignment) cell.alignment = style.alignment;
      if (style.fill) cell.fill = style.fill;
      cell.value = data[columnId];
    });
    row.commit();
  }

  async commitWorkbook(filename: string): Promise<string> {
    console.log(`File ${filename} starting to build...`);
    const filepath = path.resolve(
      `${process.cwd()}/reports`,
      `${filename}.xlsx`
    );
    this.workbook.xlsx.writeFile(filepath);
    console.log("Excel built successfully");
    return filepath;
  }

  uploadImage(filename: string): number {
    const id = this.workbook.addImage({
      filename,
      extension: "png",
    });
    console.log("File upload successfully");
    return id;
  }
}
