import { Injectable } from '@angular/core';

import { Hole, Course, Score, Round } from './model';

@Injectable()
export class DataService {

    public courses: Course[];
    private rounds: Round[];

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
        localStorage.setItem('data', JSON.stringify(this));
    }

    public load(rawData?: any) {
        if (!rawData) {
            rawData = localStorage.getItem('data');
        }
        if (rawData) {
            let data = JSON.parse(rawData);
            this.courses = data.courses;
            this.rounds = data.rounds;
        } else {
            this.clear();
        }
    }

    public clear() {
        this.courses = [];
        this.rounds = [];
    }

}