import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ColorMapUtils } from './colormap';
import { DataService } from '../data/data.service';
import { Matrix } from './matrix';

@Component({
    moduleId: module.id,
    selector: 'results',
    templateUrl: 'results.component.html',
})
export class ResultsComponent implements OnInit {

    matrix: Matrix = new Matrix(this.dataService.rounds, this.dataService.course);
    colorMap: string[][] = [];
    public configLimit: number = 10;
    public configColorScheme: string = 'none';

    constructor(private http: Http, private dataService: DataService) {
    }

    ngOnInit() {
        this.http.get('./assets/data.csv').subscribe(result => this.dataService.processCSVData(result.text()) || this.updateMatrix());
    }

    updateMatrix() {
        let startTime = new Date().getTime();
        this.matrix = new Matrix(this.dataService.rounds, this.dataService.course, this.dataService.rounds.length - this.configLimit);
        this.colorMap = ColorMapUtils.createColorMap(this.configColorScheme, this.matrix);
        let endTime = new Date().getTime();
        console.log('update took: ', endTime - startTime, 'ms');
    }

}