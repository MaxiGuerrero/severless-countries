import ReportService from "../service/report.service";

const excel: any = {
  createWorkSheet: jest.fn(),
  generateColumns: jest.fn(),
  insertDataInCell: jest.fn(),
  commitWorkbook: jest.fn(),
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
  // Act
  reportService.generateReport(data, {
    title: "test",
    values: [],
    labels: [],
  });
  // Assert
  expect(excel.createWorkSheet).toBeCalledWith("country-report");
  expect(excel.generateColumns).toBeCalled();
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
    }
  );
  expect(excel.commitWorkbook).toBeCalled();
});
