import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { DataService } from './data.service';
import { Hole, Course, Score, Round } from './model';

@Injectable()
export class ImportService {

    constructor(
        private dataService: DataService,
        private http: Http
    ) {}

    public initFromCsv() {
        this.http.get('./assets/data.csv').subscribe(result => this.processCSVData(result.text()));
    }

    private processCSVData(csvData: string) {
        var course = this.createWestpark();
        this.dataService.courses = [course];
        csvData.split('\r\n').map(line => this.processCSVLine(line, course.holes)).forEach(round => this.dataService.addRound(round));
    }

    private processCSVLine = (line, holes) => {
        var parts = line.split('\t');
        let textToInt = text => text ? Number.parseInt(text) : null;
        return new Round(
            'Braunschweig Westpark',
            new Date(parts[1].split('.').reverse().join('-')),
            holes.map((hole, holeIndex) => parts[4 + holeIndex] ? new Score(textToInt(parts[4 + holeIndex])) : null),
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