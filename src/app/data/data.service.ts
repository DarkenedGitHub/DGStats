import { Injectable } from '@angular/core';
import { Hole, Course, Score, Round } from './model';

@Injectable()
export class DataService {

    public courses: Course[] = [];

    public course: Course = new Course('dummy');
    public rounds: Round[] = [];

    constructor() {
        this.course = this.createWestpark();
        this.courses.push(this.course);
    }

    public processCSVData(csvData: string) {
        this.rounds = csvData.split('\r\n').map(this.lineToRound);
    }

    private lineToRound = line => {
        var parts = line.split('\t');
        let textToInt = text => text ? Number.parseInt(text) : null;
        return new Round(
            new Date(parts[1].split('.').reverse().join('-')),
            this.course.holes.map((hole, holeIndex) => parts[4 + holeIndex] ? new Score(hole, textToInt(parts[4 + holeIndex])) : null),
            parts[2]
        );
    }

    private createWestpark(): Course {
        var westpark = new Course('Braunschweig Westpark');
        for (var holeIndex = 0; holeIndex < 18; holeIndex++) {
            westpark.holes.push(new Hole(3));
        }
        return westpark;
    }

    public holeIndexRange(): number[] {
        var range = [];
        let max = this.courses.map(course => course.holes.length).reduce((a, b) => a > b ? a : b);
        for (var index = 0; index < max; index++) {
            range.push(index);
        }
        return range;
    }

}