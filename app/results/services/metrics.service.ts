import { Injectable } from "@angular/core";

type Metric = (holeIndex: number, values: number[]) => number;

export class Course {
    constructor(public pars: number[]) { }
}

export class Round {
    constructor(public course: Course, public date: Date, public note: string, public throws: number[]) { }

    copy() : Round {
        let throwsCopy: number[] = [];
        for (let holeIndex = 0; holeIndex < this.course.pars.length; holeIndex++) {
            throwsCopy[holeIndex] = this.throws[holeIndex];
        }
        return new Round(this.course, this.date, this.note, throwsCopy);
    }

    copyFrom(round: Round) {
        this.course = round.course;
        this.date = round.date;
        this.note = round.note;
        this.throws = round.throws;
    }

}

@Injectable()
export class MetricsService {

    private metrics: { [index: string]: Metric } = {};
    course: Course = new Course([]);
    rounds: Round[] = [];
    byHoleMetric : { [name: string] : number[] } = {};

    constructor() {
        this.addMetric('par', (holeIndex, throws) => this.course[holeIndex]);
        this.addMetric('min', (holeIndex, throws) => throws.reduce((a, b) => Math.min(a, b)));
        this.addMetric('avg', (holeIndex, throws) => throws.reduce((a, b) => a + b) / throws.length);
        this.addMetric('max', (holeIndex, throws) => throws.reduce((a, b) => Math.max(a, b)));
    }

    get metricNames(): string[] {
        let names = [];
        for (let name in this.metrics) {
            names.push(name);
        }
        return names;
    }

    addMetric(name: string, metric: Metric) {
        this.metrics[name] = metric;
    }

    calculateAllMetrics() {
        this.byHoleMetric = {};
        for (let name in this.metrics) {
            this.byHoleMetric[name] = [];
            for (let holeIndex = 0; holeIndex < this.course.pars.length; holeIndex++) {
                let validValues = this.rounds.map(round => round.throws[holeIndex]).filter(value => value);
                this.byHoleMetric[name][holeIndex] = validValues.length > 0 ? this.metrics[name](holeIndex, validValues) : null;
            }
        }
        this.byHoleMetric['par'] = this.course.pars;
    }

}