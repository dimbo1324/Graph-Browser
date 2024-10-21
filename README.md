* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Arial Rounded MT Bold", sans-serif;
}

body {
    font-family: "Arial Rounded MT Bold", sans-serif;
    height: 100vh;
    overflow: hidden;
    /* Убираем прокрутку на странице */
}

.container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 60px 1fr;
    height: 100vh;
}

.topbar {
    grid-column: 1 / -1;
    background-color: #d0d6da;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo h2 {
    color: #161a1f;
    font-size: 1.5rem;
}

.user {
    display: flex;
    align-items: center;
}

.user img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
}

/* Main content */
.main {
    padding: 20px;
    overflow-y: auto;
    /* Добавляем прокрутку, если контент выходит за рамки */
    height: calc(100vh - 60px);
    /* Контентная часть должна занимать всю высоту */
}

.charts {
    margin-top: 20px;
    display: flex;
    /* Используем Flexbox для размещения */
    gap: 15px;
    /* Расстояние между элементами */
    height: 100%;
    /* Полная высота для графиков */
}

.chart {
    background: #ededee;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    flex: 7;
    /* 70% ширины для графика */
    overflow-y: auto;
    /* Прокрутка, если контент слишком большой */
}

.manage-panel {
    background: #d0d6da;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    flex: 3;
    /* 30% ширины для панели управления */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* Выравниваем элементы в панели по началу */
}

.manage-panel h2 {
    text-align: center;
    font-size: 18px;
    color: #29323b;
}

/* Media Queries */* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Arial Rounded MT Bold", sans-serif;
}

body {
    font-family: "Arial Rounded MT Bold", sans-serif;
    height: 100vh;
    overflow: hidden;
    /* Убираем прокрутку на странице */
}

.container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 60px 1fr;
    height: 100vh;
}

.topbar {
    grid-column: 1 / -1;
    background-color: #d0d6da;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo h2 {
    color: #161a1f;
    font-size: 1.5rem;
}

.user {
    display: flex;
    align-items: center;
}

.user img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
}

/* Main content */
.main {
    padding: 20px;
    overflow-y: auto;
    /* Добавляем прокрутку, если контент выходит за рамки */
    height: calc(100vh - 60px);
    /* Контентная часть должна занимать всю высоту */
}

.charts {
    margin-top: 20px;
    display: flex;
    /* Используем Flexbox для размещения */
    gap: 15px;
    /* Расстояние между элементами */
    height: 100%;
    /* Полная высота для графиков */
}

.chart {
    background: #ededee;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    flex: 7;
    /* 70% ширины для графика */
    overflow-y: auto;
    /* Прокрутка, если контент слишком большой */
}

.manage-panel {
    background: #d0d6da;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    flex: 3;
    /* 30% ширины для панели управления */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* Выравниваем элементы в панели по началу */
}

.manage-panel h2 {
    text-align: center;
    font-size: 18px;
    color: #29323b;
}

/* Media Queries */
@media (max-width: 1200px) {
    .container {
        grid-template-columns: 180px 1fr;
    }

    .main {
        padding: 10px;
    }
}

@media (max-width: 880px) {
    .main {
        margin-left: 0;
        width: 100%;
        padding: 10px;
    }
}

@media (max-width: 500px) {
    .topbar {
        flex-direction: column;
        gap: 10px;
    }
}
@media (max-width: 1200px) {
    .container {
        grid-template-columns: 180px 1fr;
    }

    .main {
        padding: 10px;
    }
}

@media (max-width: 880px) {
    .main {
        margin-left: 0;
        width: 100%;
        padding: 10px;
    }
}

@media (max-width: 500px) {
    .topbar {
        flex-direction: column;
        gap: 10px;
    }
}
