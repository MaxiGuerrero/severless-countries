import * as path from "path";
import puppeteer from "puppeteer";

export default class Chart {
  colors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(217, 115, 0)",
    "rgb(1, 187, 110)",
    "rgb(1, 187, 209)",
    "rgb(1, 222, 15)",
    "rgb(254, 150, 249)",
    "rgb(14, 86, 0)",
    "rgb(1, 19, 191)",
  ];

  async makeGraph(
    values: number[],
    title: string,
    labels: string[]
  ): Promise<string> {
    try {
      const pathImage = path.resolve(`${process.cwd()}/reports`, `image.png`);
      if (values.length !== labels.length)
        throw new Error(
          `Labels and values does not have equal size values ${values.length} vs labels ${labels.length}`
        );
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const options = {
        responsive: true,
        animation: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          datalabels: {
            anchor: "end",
            align: "end",
            color: "black",
            font: {
              weight: "bold",
            },
          },
        },
      };
      const data = {
        labels,
        datasets: [
          {
            label: title,
            data: values,
            backgroundColor: this.colors,
            borderColor: this.colors,
            borderWidth: 1,
          },
        ],
      };
      const htmlContent = `
        <html>
          <head>
            <title>Gráfico</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
          </head>
          <body>
            <canvas id="myChart" width=800 height=600></canvas>
            <script>
              const ctx = document.getElementById('myChart').getContext('2d');
              const data = ${JSON.stringify(data)};
              const options = ${JSON.stringify(options)};
              new Chart(ctx, {
                type: "bar",
                data: data,
                options: options,
                plugins: [ChartDataLabels]
              });
            </script>
          </body>
        </html>
      `;
      await page.setContent(htmlContent);
      await page.screenshot({
        path: pathImage,
      });
      console.log("Image generated successfully");
      await browser.close();
      return pathImage;
    } catch (error) {
      throw error;
    }
  }
}
