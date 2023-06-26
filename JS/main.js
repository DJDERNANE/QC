const ctx = document.getElementById("myChart").getContext("2d");

let delayed;

const navLinks = document.querySelectorAll("nav a");




//Gradient Fill
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(58, 123, 213, 1)");
gradient.addColorStop(0, "rgba(0, 210, 255, 0.3)");

const labels = ["label1", "label2", "label3", "label4", "label5", "label6"];

// const csv = require("csv-parser");
// const fs = require("fs");

const results = [];

// fs.createReadStream("data.csv")
//   .pipe(csv())
//   .on("data", (data) => {
//     console.log(data);
//     results.push(data["Column1"]); // Replace "Column1" with the actual header of the first column in your CSV file
//   })
//   .on("end", () => {
//     console.log(results); // Do something with the results array
//   });

// const file = "data.csv";

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  // Read file as string
  reader.readAsText(input);

  // Load event
  reader.onload = function (event) {
    // Read file data
    var csvdata = event.target.result;
    console.log(csvdata);
    // Split by line break to gets rows Array
    var rowData = csvdata.split("\n");

    // Loop on the row Array (change row=0 if you also want to read 1st row)
    for (let row of rowData) {
      // Split by comma (,) to get column Array
      rowColData = row.split(",");

      results.push(rowColData[0]);
    }

    const data = {
      labels,
      datasets: [
        {
          data: results,
          //   [211, 326, 165, 350, 420, 370, 500, 375, 415],
          label: "Quantum Results",
          fill: false,
          backgroundColor: "#3DD1F2",
          borderColor: "#3DD1F2",
          pointBackgroundColor: "#3DD1F2",
        },

      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        radius: 5,
        hitRadius: 30,
        hoverRadius: 12,
        responsive: true,

        animation: {
          onComplete: () => {
            delayed = true;
          },

          delay: (context) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          y: ["one", "two", "three"],

          //   {
          //     ticks: {
          //       callback: function (value) {
          //         return "$" + value + "m";
          //       },
          //     },
          //   },
        },
      },
    };

    const myChart = new Chart(ctx, config);
  };
});
