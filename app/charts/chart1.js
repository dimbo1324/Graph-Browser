const ctx = document.getElementById("line-chart")

export const lineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    datasets: [
      {
        label: "Данные чего-то от чего-то",
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        backgroundColor: ["rgba(3,3,3,3"],
        backgroundColor: ["rgb(3,3,30"],
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
  },
})
