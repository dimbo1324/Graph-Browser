

export const displayOptions = {
    type: "line",
    data: {
        datasets: [{
            label: "Данные от времени",
            data: timelineEditor.edit(),
            borderColor: "rgb(3,3,30)",
            borderWidth: 2,
            fill: false,
            tension: 0.1,
        },],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        second: "MMM dd, HH:mm:ss",
                        minute: "MMM dd, HH:mm",
                        hour: "MMM dd, HH:mm",
                        day: "MMM dd",
                    },
                },
                ticks: {
                    maxTicksLimit: 8,
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
                    onZoom: ({
                        chart
                    }) => {
                        const min = chart.scales.x.min;
                        const max = chart.scales.x.max;
                        const range = max - min;


                        if (range <= 1000 * 60) {
                            chart.scales.x.options.time.unit = "second";
                        } else if (range <= 1000 * 60 * 60) {
                            chart.scales.x.options.time.unit = "minute";
                        } else if (range <= 1000 * 60 * 60 * 24) {
                            chart.scales.x.options.time.unit = "hour";
                        } else {
                            chart.scales.x.options.time.unit = "day";
                        }
                        chart.update();
                    },
                },
                pan: {
                    enabled: true,
                    mode: "x",
                },
            },
        },
    },
}