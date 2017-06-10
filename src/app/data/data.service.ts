import { Injectable } from '@angular/core';
import { Hole, Course, Score, Round } from './model';

@Injectable()
export class DataService {

    public course: Course = new Course('dummy');
    public rounds: Round[] = [];

    public processCSVData(csvData: string) {
        var lineArray = csvData.split('\r\n');

        this.course = this.createWestpark();

        let resultsRef = this;
        this.rounds = lineArray.map(this.lineToRound);
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

}