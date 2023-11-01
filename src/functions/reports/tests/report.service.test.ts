import ReportService from "../service/report.service";

jest.mock("utils/fileTobase64", () => ({
  fileToBase64: jest.fn(() => "hash"),
}));

const excel: any = {
  createWorkSheet: jest.fn(),
  generateColumns: jest.fn(),
  insertDataInCell: jest.fn(),
  commitWorkbook: jest.fn(),
  uploadImage: jest.fn(),
  setImageToWorksheet: jest.fn(),
};

const chart: any = {
  makeGraph: jest.fn(),
};

const reportService = new ReportService(excel, chart);

test("Report generated successfully", async () => {
  // Arrenge
  const data = [
    {
      keyA: "valueA",
      keyB: "valueB",
    },
  ];
  excel.createWorkSheet.mockReturnValue("worksheet");
  excel.uploadImage.mockReturnValue("path");
  excel.commitWorkbook.mockReturnValue("filepath");
  chart.makeGraph.mockReturnValue("pathImage");
  // Act
  const output = await reportService.generateReport(data, {
    title: "test",
    values: [],
    labels: [],
  });
  // Assert
  expect(excel.createWorkSheet).toBeCalledWith("country-report");
  expect(excel.generateColumns).toBeCalled();
  expect(chart.makeGraph).toBeCalled();
  expect(excel.insertDataInCell).toBeCalledWith(
    "worksheet",
    1,
    ["keyA", "keyB"],
    {
      keyA: "keyA",
      keyB: "keyB",
    },
    {
      alignment: { horizontal: "center" },
      font: {
        bold: true,
      },
    }
  );
  expect(excel.uploadImage).toBeCalled();
  expect(excel.setImageToWorksheet).toBeCalled();
  expect(excel.commitWorkbook).toBeCalled();
  expect(output).toEqual("hash");
});
