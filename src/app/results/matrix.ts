import { Course, Round } from './model';

export class Cell {
    constructor(
        public value: number, 
        public isInt: boolean = true
    ) {
        let exp = isInt ? 1 : 10;
        this.value = Math.round(this.value * exp) / exp;
    }
}

export class Line {
    constructor(
        public id: Round | string = null, 
        public cells: Cell[] = []
    ) {}
}

type selectorFn = (allCells: Cell[]) => Cell[];
type acceptorFn = (selectedCells: Cell[]) => boolean;
type reducerFn = (value1: number, value2: number) => number;

let validCellSelector: selectorFn = cells => cells.filter(cell => cell);
let sumReducer: reducerFn = (value1, value2) => value1 + value2;
let minReducer: reducerFn = (value1, value2) => value1 < value2 ? value1 : value2;
let maxReducer: reducerFn = (value1, value2) => value1 > value2 ? value1 : value2;

function calcMetric(cells: Cell[], select?: selectorFn, accept?: acceptorFn, reducer?: reducerFn, divideByCount?: boolean) : Cell {
    var selectedCells = select ? select(cells) : cells;
    if (!accept || accept(selectedCells)) {
        var values = selectedCells.map(cell => cell.value);
        var allInt = selectedCells.every(cell => cell.isInt);
        var reducedValue = reducer && values.length > 0 ? values.reduce(reducer) : null;
        var finishedValue = reducedValue && divideByCount ? reducedValue / selectedCells.length : reducedValue;
        return finishedValue ? new Cell(finishedValue, allInt && !divideByCount) : null;
    } else {
        return null;
    }
}

export class Matrix {
    public roundLines: Line[] = [];
    public metricLines: Line[] = [];

    constructor(public rounds: Round[], public course: Course) {
        this.recalculate();
    }

    getValidValues(columnIndex: number): number[] {
        return this.roundLines.
            map(roundLine => roundLine.cells[columnIndex]).
            filter(cell => cell != null).
            map(cell => cell.value);
    }

    contains

    recalculate() {
        // extract scores
        this.roundLines = [];
        for (var roundIndex = 0; roundIndex < this.rounds.length; roundIndex++) {
            var round = this.rounds[roundIndex];
            var line = new Line(round);
            this.roundLines.push(line);            
            for (var holeIndex = 0; holeIndex < this.course.holes.length; holeIndex++) {
                var hole = this.course.holes[holeIndex];
                var score = round.scores.filter(score => score).find(score => score.hole === hole);
                line.cells.push(score ? new Cell(score.throws) : null);
            }
        }
        // metrics lines
        var metricPar = new Line('par', this.course.holes.map(hole => new Cell(hole.par)));
        var metricMin = new Line('min', this.course.holes.map((hole, index) => calcMetric(this.roundLines.map(roundLine => roundLine.cells[index]), validCellSelector, null, minReducer)));
        var metricMax = new Line('max', this.course.holes.map((hole, index) => calcMetric(this.roundLines.map(roundLine => roundLine.cells[index]), validCellSelector, null, maxReducer)));
        var metricAvg = new Line('avg', this.course.holes.map((hole, index) => calcMetric(this.roundLines.map(roundLine => roundLine.cells[index]), validCellSelector, null, sumReducer, true)));
        this.metricLines = [metricPar, metricMin, metricAvg, metricMax];
        // line metrics
        this.roundLines.forEach(roundLine => roundLine.cells.push(calcMetric(roundLine.cells, validCellSelector, cells => cells.length == roundLine.cells.length, sumReducer)));
        this.metricLines.forEach(roundLine => roundLine.cells.push(calcMetric(roundLine.cells, validCellSelector, cells => cells.length == roundLine.cells.length, sumReducer)));
    }

}
