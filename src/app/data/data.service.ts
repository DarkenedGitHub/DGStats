import { Injectable } from '@angular/core';

import { Hole, Course, Score, Round } from './model';

@Injectable()
export class DataService {

    public courses: Course[];
    rounds: Round[];

    constructor() {
        this.load();
    }

    public holeIndexRange(): number[] {
        var range = [];
        let max = this.courses.map(course => course.holes.length).reduce((a, b) => a > b ? a : b, 0);
        for (var index = 0; index < max; index++) {
            range.push(index);
        }
        return range;
    }

    public roundsForCourse(course: Course) {
        return this.rounds.filter(round => round.courseName === course.name);
    }

    public addRound(round: Round) {
        this.rounds.push(round);
    }

    public save() {
        localStorage.setItem('courses', JSON.stringify(this.courses));
        localStorage.setItem('rounds', JSON.stringify(this.rounds));
    }

    public load() {
        this.courses = localStorage.getItem('courses') ? JSON.parse(localStorage.getItem('courses')) : [];
        this.rounds = localStorage.getItem('rounds') ? JSON.parse(localStorage.getItem('rounds')) : [];
    }

    public clear() {
        this.courses = [];
        this.rounds = [];
    }

}