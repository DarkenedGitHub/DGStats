import { Matrix } from './matrix';

type ColorFn = (value: number, metrics: Object) => string;

export class ColorMapUtils {

    static createColorMap(type: string, matrix: Matrix): string[][] {
        // determine color function
        var colorFn: ColorFn;
        if (type === 'par') {
            colorFn = (value, metrics) => value < metrics['par'] ? 'darkgreen' : (value > metrics['par'] ? 'darkred' : null);
        } else if (type === 'minmax') {
            colorFn = (value, metrics) => value === metrics['min'] ? 'darkgreen' : (value === metrics['max'] ? 'darkred' : null);
        } else if (type === 'relative') {
            colorFn = (value, metrics) => value < metrics['avg'] ? 'darkgreen' : (value > metrics['avg'] ? 'darkred' : null);
        } else if (type === 'smooth') {
            colorFn = (value, metrics) => {
                var min = metrics['min'];
                var avg = metrics['avg'];
                var max = metrics['max'];
                var maxLight = 100;
                var greenVal = value < avg ? maxLight : maxLight -  Math.round(maxLight * (value - avg) / (max - avg));
                var redVal = value > avg ? maxLight : maxLight -  Math.round(maxLight * (value - avg) / (min - avg));
                return 'rgb(' + redVal + ', ' + greenVal + ', 0)';
            };
        }
        // init
        var colorMap: string[][] = [];
        for (var roundIndex = 0; roundIndex < matrix.roundLines.length; roundIndex++) {
            colorMap[roundIndex] = [];
        }
        // apply color function
        if (colorFn) {
            this.fillColorMap(colorMap, matrix, colorFn);
        }
        return colorMap;
    }

    static fillColorMap(colorMap: string[][], matrix: Matrix, color: ColorFn) {
        var extractMetrics = function(cellIndex: number) {
            var metrics = {};
            matrix.metricLines.forEach(metricLine => { 
                metrics[metricLine.metricName] = metricLine.cells[cellIndex];
            });
            return metrics;
        };
        for (var lineIndex = 0; lineIndex < matrix.roundLines.length; lineIndex++) {
            var line = matrix.roundLines[lineIndex]
            for (var cellIndex = 0; cellIndex < line.cells.length; cellIndex++) {
                var cell = line.cells[cellIndex];
                if (cell) {
                    colorMap[lineIndex][cellIndex] = color(cell, extractMetrics(cellIndex));
                }
            }
        }
    }

}