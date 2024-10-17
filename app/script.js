import Chart from "./Chart/Chart.js"

const data = [
    {
        "x": "2024-07-31T21:01:00.719Z",
        "y": 10520
    },
    {
        "x": "2024-08-01T02:11:59.738Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T02:12:05.142Z",
        "y": 10520
    },
    {
        "x": "2024-08-01T02:14:03.857Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T02:14:09.259Z",
        "y": 10520
    },
    {
        "x": "2024-08-01T02:14:14.666Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T02:14:20.064Z",
        "y": 10520
    },
    {
        "x": "2024-08-01T02:15:03.233Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:42:53.870Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:43:15.447Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:43:20.844Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:43:26.248Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:44:14.814Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:44:20.222Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:45:14.186Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:45:41.174Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:48:23.075Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:48:44.643Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:49:33.213Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:51:10.360Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:51:42.740Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:52:42.085Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:52:47.489Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:52:52.885Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:52:58.272Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:53:03.671Z",
        "y": 10519
    },
    {
        "x": "2024-08-01T03:53:19.873Z",
        "y": 10518
    },
    {
        "x": "2024-08-01T03:53:25.274Z",
        "y": 10519
    },
    {
        "x": "2024-08-25T17:20:45.229Z",
        "y": 5681.463
    },
    {
        "x": "2024-08-25T17:20:50.631Z",
        "y": 5680.822
    },
    {
        "x": "2024-08-25T17:20:56.035Z",
        "y": 5679.968
    },
    {
        "x": "2024-08-25T17:21:01.439Z",
        "y": 5679.328
    },
    {
        "x": "2024-08-25T17:21:06.838Z",
        "y": 5678.474
    },
    {
        "x": "2024-08-25T17:21:12.236Z",
        "y": 5677.619
    },
    {
        "x": "2024-08-25T17:21:17.639Z",
        "y": 5676.978
    },
    {
        "x": "2024-08-25T17:21:23.043Z",
        "y": 5676.124
    },
    {
        "x": "2024-08-25T17:21:28.440Z",
        "y": 5675.27
    },
    {
        "x": "2024-08-25T17:21:33.831Z",
        "y": 5674.629
    },
    {
        "x": "2024-08-25T17:21:39.227Z",
        "y": 5673.775
    },
    {
        "x": "2024-08-25T17:21:44.626Z",
        "y": 5673.134
    },
    {
        "x": "2024-08-25T17:21:50.029Z",
        "y": 5672.279
    },
    {
        "x": "2024-08-25T17:21:55.431Z",
        "y": 5671.425
    },
    {
        "x": "2024-08-25T17:22:00.811Z",
        "y": 5670.57
    },
    {
        "x": "2024-08-25T17:22:06.219Z",
        "y": 5669.93
    },
    {
        "x": "2024-08-25T17:22:11.619Z",
        "y": 5669.076
    },
    {
        "x": "2024-08-25T17:22:17.022Z",
        "y": 5668.435
    },
    {
        "x": "2024-08-25T17:22:22.421Z",
        "y": 5667.581
    },
    {
        "x": "2024-08-25T17:22:27.819Z",
        "y": 5666.726
    },
    {
        "x": "2024-08-25T17:22:33.219Z",
        "y": 5666.085
    },
    {
        "x": "2024-08-25T17:22:38.623Z",
        "y": 5665.444
    },
    {
        "x": "2024-08-25T17:22:44.021Z",
        "y": 5664.591
    },
    {
        "x": "2024-08-25T17:22:49.423Z",
        "y": 5663.95
    },
    {
        "x": "2024-08-25T17:22:54.823Z",
        "y": 5663.096
    },
    {
        "x": "2024-08-25T17:23:00.214Z",
        "y": 5662.241
    },
    {
        "x": "2024-08-25T17:23:05.620Z",
        "y": 5661.6
    },
    {
        "x": "2024-08-25T17:23:11.021Z",
        "y": 5660.853
    },
    {
        "x": "2024-08-25T17:23:16.420Z",
        "y": 5660.318
    },
    {
        "x": "2024-08-25T17:23:21.821Z",
        "y": 5659.038
    },
    {
        "x": "2024-08-25T17:23:27.220Z",
        "y": 5658.61
    },
    {
        "x": "2024-08-25T17:23:32.622Z",
        "y": 5657.756
    },
    {
        "x": "2024-08-25T17:23:38.018Z",
        "y": 5657.115
    },
    {
        "x": "2024-08-25T17:23:43.422Z",
        "y": 5656.26
    },
    {
        "x": "2024-08-25T17:23:48.819Z",
        "y": 5655.407
    },
    {
        "x": "2024-08-25T17:23:54.220Z",
        "y": 5654.766
    },
    {
        "x": "2024-08-25T17:23:59.618Z",
        "y": 5654.125
    },
    {
        "x": "2024-08-25T17:24:05.017Z",
        "y": 5652.63
    },
    {
        "x": "2024-08-25T17:24:10.413Z",
        "y": 5652.523
    },
    {
        "x": "2024-08-25T17:24:15.813Z",
        "y": 5651.562
    },
    {
        "x": "2024-08-25T17:24:21.214Z",
        "y": 5650.707
    },
    {
        "x": "2024-08-31T20:59:00.719Z",
        "y": 5650.707
    }
]

const chart = new Chart("#chart-container", data)