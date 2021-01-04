chartIt();
async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById("chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xAxis,
      datasets: [
        {
          fill: "false",
          label:
            "Land-Ocean: Southern Hemispheric Means in °C (Degree Celcius)",
          data: data.yAxis,
          backgroundColor: "black",
          borderColor: "yellow",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value, index, values) {
                return value + "°C";
              },
            },
          },
        ],
      },
    },
  });
}

async function getData() {
  const xAxis = [];
  const yAxis = [];

  const response = await fetch("SH.Ts+dSST.csv");
  const data = await response.text();
  //   console.log(data);
  const table = data.split("\n").slice(2);
  //   console.log(table);
  table.forEach((rows) => {
    const list = rows.split(",");
    // console.log(list);
    const year = list[0];
    const temp = list[1];
    console.log(year, temp);
    xAxis.push(year);
    yAxis.push(parseFloat(temp) + 1);
  });
  return { xAxis, yAxis };
}
