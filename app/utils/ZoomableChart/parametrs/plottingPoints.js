export const plottingPoints = (() => {
    const random = d3.randomNormal(0, 0.1);
    const sqrt3 = Math.sqrt(3);
    return [].concat(
        Array.from({ length: 10 }, () => [random() + sqrt3, random() + 1, 0]),
        Array.from({ length: 10 }, () => [random() - sqrt3, random() + 1, 1]),
        Array.from({ length: 10 }, () => [random(), random() - 1, 2])
    );
})();



