import { Injectable } from "@angular/core";

type Metric = (holeIndex: number, values: number[]) => number;

export class Round {
    constructor(public date: Date, public note: string, public throws: number[]) { }
}

@Injectable()
export class MetricsService {

    private metrics: { [index: string]: Metric } = {};
    course: number[] = [];
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
            for (let holeIndex = 0; holeIndex < this.course.length; holeIndex++) {
                let validValues = this.rounds.map(round => round.throws[holeIndex]).filter(value => value);
                this.byHoleMetric[name][holeIndex] = validValues.length > 0 ? this.metrics[name](holeIndex, validValues) : null;
            }
        }
    }

}