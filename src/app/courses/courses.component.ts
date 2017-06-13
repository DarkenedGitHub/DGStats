import { Component } from '@angular/core';

import { DataService } from '../data/data.service';
import { Course, Hole } from '../data/model';

@Component({
    moduleId: module.id,
    selector: 'courses',
    templateUrl: 'courses.component.html',
})
export class CoursesComponent {

    public newCourse: Course;

    constructor(private dataService: DataService) { this.startCreating(); }

    public startCreating() {
        this.newCourse = new Course('');
        for (var i = 0; i < 9; i++) {
            this.newCourse.holes.push(new Hole(3));
        }
    }

    public finishCreating() {
        this.dataService.courses.push(this.newCourse);
        this.newCourse = null;
    }

    public addHole() {
        this.newCourse.holes.push(new Hole(3));
    }

    public removeHole() {
        this.newCourse.holes.pop();
    }

    public adjustHoleCount(holeCount: number) {
        while (holeCount < this.newCourse.holes.length) {
            this.removeHole();
        }
        while (holeCount > this.newCourse.holes.length) {
            this.addHole();
        }
    }

    public incPar(hole: Hole) {
        hole.par++;
    }

    public decPar(hole: Hole) {
        hole.par--;
    }

    public newCourseIsValid() {
        return this.newCourse.name && 
            this.newCourse.holes && 
            this.newCourse.holes.length >= 9 && this.newCourse.holes.length <= 18 &&
            this.newCourse.holes.map(hole => hole.par).reduce((a, b) => Math.min(a, b)) >= 3 &&
            this.newCourse.holes.map(hole => hole.par).reduce((a, b) => Math.max(a, b)) <= 5;
    }

}