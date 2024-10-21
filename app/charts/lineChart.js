const ctx = document.getElementById("line-chart")

export const lineChart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Данные от времени",
        data: [
          { x: "2024-07-31T21:01:00.719Z", y: 10520 },
          { x: "2024-08-01T02:11:59.738Z", y: 10519 },
          { x: "2024-08-01T02:12:05.142Z", y: 10520 },
        ],
        borderColor: "rgb(3,3,30)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          displayFormats: {
            second: "MMM dd, HH:mm:ss.SSS",
          },
        },
        title: {
          display: true,
          text: "Время",
        },
      },
      y: {
        title: {
          display: true,
          text: "Значение",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
  },
})

document.getElementById("resetZoom").addEventListener("click", function () {
  lineChart.resetZoom()
})
