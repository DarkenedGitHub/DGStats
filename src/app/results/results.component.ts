import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ColorMapService } from './colormap.service';
import { Hole, Course, Score, Round } from './model';
import { Matrix } from './matrix';

@Component({
    moduleId: module.id,
    selector: 'results',
    templateUrl: 'results.component.html'
})
export class ResultsComponent implements OnInit {

    course: Course = new Course('dummy');
    rounds: Round[] = [];
    matrix: Matrix = new Matrix(this.rounds, this.course);
    colorMap: string[][] = [];
    public configLimit: number = 10;
    public configColorScheme: string = 'none';

    constructor(private http: Http, private colorMapService: ColorMapService) {
    }

    ngOnInit() {
        this.http.get('./assets/data.csv').subscribe(result => this.processCSVData(result));
    }

    processCSVData(csvData: Response) {
        var textData = csvData.text();
        var lineArray = textData.split('\r\n');

        this.course = this.createWestpark();

        let resultsRef = this;
        this.rounds = lineArray.map(function(line) {
            var parts = line.split('\t');
            return new Round(
                new Date(parts[1].split('.').reverse().join('-')),
                resultsRef.course.holes.map((hole, holeIndex) => parts[4 + holeIndex] ? new Score(hole, resultsRef.textToInt(parts[4 + holeIndex])) : null),
                parts[2]
            );
        });
        this.updateColorMap();
    }

    private updateColorMap() {
        this.matrix = new Matrix(this.rounds, this.course);
        this.colorMap = this.colorMapService.createColorMap(this.configColorScheme, this.matrix);
    }

    private textToInt(text: string): number {
        return text ? Number.parseInt(text) : null;
    }

    private createWestpark(): Course {
        var westpark = new Course('Braunschweig Westpark');
        for (var holeIndex = 0; holeIndex < 18; holeIndex++) {
            westpark.holes.push(new Hole(3));
        }
        return westpark;
    }

}