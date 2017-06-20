import { Course, Round } from '../data/model';

export class RoundLine {
    constructor(
        public round: Round, 
        public cells: number[] = [],
    ) {}
}

export class MetricLine {
    constructor(
        public metricName: string, 
        public cells: number[] = [],
        public fractionDigits: number = 0
    ) {}
}

type SelectorFn = (allCells: number[]) => number[];
type AcceptorFn = (selectedCells: number[]) => boolean;
type ReducerFn = (value1: number, value2: number) => number;

let validCellSelector: SelectorFn = cells => cells.filter(cell => cell);
let sumReducer: ReducerFn = (value1, value2) => value1 + value2;
let minReducer: ReducerFn = (value1, value2) => value1 < value2 ? value1 : value2;
let maxReducer: ReducerFn = (value1, value2) => value1 > value2 ? value1 : value2;

function calcMetric(cells: number[], select?: SelectorFn, accept?: AcceptorFn, reducer?: ReducerFn, divideByCount?: boolean): number {
    var selectedCells = select ? select(cells) : cells;
    if (!accept || accept(selectedCells)) {
        var reducedValue = reducer && selectedCells.length > 0 ? selectedCells.reduce(reducer) : null;
        return reducedValue && divideByCount ? reducedValue / selectedCells.length : reducedValue;
    } else {
        return null;
    }
}

export class Matrix {
    public roundLines: RoundLine[] = [];
    public metricLines: MetricLine[] = [];
    public lineMetrics: string[] = [];

    constructor(private rounds: Round[], private course: Course, public roundOffset: number = 0) {
        this.recalculate();
    }

    getValidValues(columnIndex: number): number[] {
        return this.roundLines.
            map(roundLine => roundLine.cells[columnIndex]).
            filter(cell => cell);
    }

    contains

    recalculate() {
        // extract scores
        this.roundLines = [];
        for (var roundIndex = this.roundOffset; roundIndex < this.rounds.length; roundIndex++) {
            var round = this.rounds[roundIndex];
            var line = new RoundLine(round);
            this.roundLines.push(line);            
            for (var holeIndex = 0; holeIndex < this.course.holes.length; holeIndex++) {
                var hole = this.course.holes[holeIndex];
                var score = round.scores[holeIndex];
                line.cells.push(score ? score.throws : null);
            }
        }
        // line metrics
        this.lineMetrics.push('F9');
        this.lineMetrics.push('B9');
        this.lineMetrics.push('\u2211'); // sum
        this.roundLines.forEach(roundLine => roundLine.cells.push(calcMetric(roundLine.cells, cells => validCellSelector(cells.slice(0, 9)), cells => cells.length == 9, sumReducer)));
        this.roundLines.forEach(roundLine => roundLine.cells.push(calcMetric(roundLine.cells, cells => validCellSelector(cells.slice(9, 18)), cells => cells.length == 9, sumReducer)));
        this.roundLines.forEach(roundLine => roundLine.cells.push(calcMetric(roundLine.cells, cells => validCellSelector(cells.slice(0, 18)), cells => cells.length == 18, sumReducer)));
        // metrics lines
        var cellIndices = [];
        for (var cellIndex = 0; cellIndex < this.course.holes.length + this.lineMetrics.length; cellIndex++) {
            cellIndices.push(cellIndex);
        }
        var metricPar = new MetricLine('par', this.course.holes.map(hole => hole.par));
        var metricMin = new MetricLine('min', cellIndices.map(index => calcMetric(this.roundLines.map(roundLine => roundLine.cells[index]), validCellSelector, null, minReducer)));
        var metricMax = new MetricLine('max', cellIndices.map(index => calcMetric(this.roundLines.map(roundLine => roundLine.cells[index]), validCellSelector, null, maxReducer)));
        var metricAvg = new MetricLine('avg', cellIndices.map(index => calcMetric(this.roundLines.map(roundLine => roundLine.cells[index]), validCellSelector, null, sumReducer, true)), 1);
        this.metricLines = [metricPar, metricMin, metricAvg, metricMax];
        // line metric for hole metrics
        metricPar.cells.push(calcMetric(metricPar.cells, cells => validCellSelector(cells.slice(0, 9)), cells => cells.length == 9, sumReducer));
        metricPar.cells.push(calcMetric(metricPar.cells, cells => validCellSelector(cells.slice(9, 18)), cells => cells.length == 9, sumReducer));
        metricPar.cells.push(calcMetric(metricPar.cells, cells => validCellSelector(cells.slice(0, 18)), cells => cells.length == 18, sumReducer));
    }

}
