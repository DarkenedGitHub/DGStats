import { Component } from '@angular/core';

import { Hole, Course, Score, Round } from '../data/model';
import { DataService } from '../data/data.service';
import { Matrix } from './matrix';
import { ColorMapUtils } from './colormap';

@Component({
    moduleId: module.id,
    selector: 'results',
    templateUrl: 'results.component.html',
})
export class ResultsComponent {

    private course: Course;
    private rounds: Round[];
    private matrix: Matrix;
    private colorMap: string[][] = [];
    public configLimit: number = 10;
    public configColorScheme: string = 'none';

    constructor(public dataService: DataService) {
        if (this.dataService.courses.length > 0) {
            this.changeToCourse(this.dataService.courses[0]);
        }
    }

    updateMatrix() {
        let startTime = new Date().getTime();
        this.matrix = new Matrix(this.rounds, this.course, this.rounds.length - this.configLimit);
        this.colorMap = ColorMapUtils.createColorMap(this.configColorScheme, this.matrix);
        let endTime = new Date().getTime();
        console.log('update took: ', endTime - startTime, 'ms');
    }

    changeToCourse(course: Course) {
        this.course = course;
        this.rounds = this.dataService.roundsForCourse(this.course);
        this.updateMatrix();
    }

}