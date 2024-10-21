Для того чтобы стили не мешали функциональности графика, вот пример CSS с нуля, который обеспечивает правильное отображение и взаимодействие с элементами:

```css
/* Общий контейнер для всей страницы */
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: Arial, sans-serif;
    box-sizing: border-box;
}

/* Контейнер для всего содержимого */
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

/* Верхняя панель */
.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #005bbb;
    color: white;
}

/* Лого */
.logo h2 {
    margin: 0;
    font-size: 1.5rem;
}

/* Панель пользователя */
.user img {
    height: 50px;
    border-radius: 50%;
}

/* Контейнер для основного содержимого */
.main-content {
    display: flex;
    flex: 1;
    padding: 20px;
    background-color: #f4f4f9;
}

/* Стиль для графика */
.chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 3;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 100%;
    max-height: 100%;
    overflow: hidden;
}

.chart h2 {
    margin-bottom: 20px;
    font-size: 1.2rem;
    text-align: center;
}

/* Настройки для canvas графика */
canvas {
    width: 100% !important;
    height: 100% !important;
    max-width: 100%;
    max-height: 100%;
}

/* Панель управления */
.manage-panel {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    padding: 20px;
    margin-left: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Элементы управления */
input[type="file"],
button {
    margin-bottom: 10px;
    padding: 10px;
    border: none;
    background-color: #005bbb;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
}

button:hover {
    background-color: #003f7f;
}

.reset-zoom {
    background-color: #d9534f;
}

.reset-zoom:hover {
    background-color: #c9302c;
}

/* Вывод JSON данных */
pre {
    margin-top: 10px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 5px;
    width: 100%;
    overflow: auto;
}

a {
    margin-top: 10px;
    color: #005bbb;
    cursor: pointer;
    text-decoration: none;
    display: block;
}

a:hover {
    text-decoration: underline;
}
```

### Описание ключевых моментов:
1. **Основная структура** — использую `flexbox` для расположения элементов страницы, чтобы панель управления и график не накладывались друг на друга.
2. **График** — `canvas` настроен на автоматическое масштабирование с соблюдением всех размеров (`max-width: 100%; max-height: 100%;`).
3. **Панель управления** — размещается рядом с графиком, с использованием `flex-direction: column`, чтобы элементы управления (кнопки и поля) располагались вертикально.
4. **Кнопки и взаимодействие** — стилизованы с понятными состояниями hover, чтобы обеспечить интерактивность.

Теперь график будет корректно работать с методами и возможностями библиотеки Chart.js, включая масштабирование и перемещение.