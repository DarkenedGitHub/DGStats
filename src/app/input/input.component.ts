import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'

import { Course, Round, Score } from '../data/model';
import { DataService } from '../data/data.service';

@Component({
    moduleId: module.id,
    selector: 'doinput',
    templateUrl: 'input.component.html'
})
export class InputComponent {

    JSON = JSON;
    showDatePicker: boolean = false;
    selectedCourse: Course;
    selectedDate: NgbDateStruct = this.dateToDateStruct(new Date());
    round: Round;
    currentHoleIndex: number = -1;

    constructor(
        public dataService: DataService,
        private router: Router,
    ) {}

    startInput() {
        this.round = new Round(this.selectedCourse.name, this.dateStructToDate(this.selectedDate), this.selectedCourse.holes.map(hole => null));
        this.currentHoleIndex = 0;
    }

    private dateToDateStruct(date: Date): NgbDateStruct {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        };
    }

    private dateStructToDate(dateStruct: NgbDateStruct): Date {
        return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
    }

    public incScore() {
        if (!this.round.scores[this.currentHoleIndex]) {
            this.toggleScore();
        }
        this.round.scores[this.currentHoleIndex].throws += 1;
    }

    public decScore() {
        if (!this.round.scores[this.currentHoleIndex]) {
            this.toggleScore();
        }
        this.round.scores[this.currentHoleIndex].throws -= 1;
    }

    public toggleScore() {
        if (!this.round.scores[this.currentHoleIndex]) {
            this.round.scores[this.currentHoleIndex] = new Score(this.selectedCourse.holes[this.currentHoleIndex].par);
        } else {
            this.round.scores[this.currentHoleIndex] = null;
        }
    }

    public nextHole() {
        this.currentHoleIndex += 1;
    }

    public prevHole() {
        this.currentHoleIndex -= 1;
    }

    public calcColor(holeIndex: number) {
        if (this.round.scores[holeIndex]) {
            let relativeScore = this.round.scores[holeIndex].throws - this.selectedCourse.holes[holeIndex].par;
            if (relativeScore < -1) {
                return 'goldenrod';
            } else if (relativeScore < 0) {
                return 'green';
            } else if (relativeScore > 0) {
                return 'red';
            }
        }
        return null; // use default color for none/par
    }

    public saveRound() {
        this.dataService.addRound(this.round);
        this.dataService.save();
        this.router.navigate(['/results']);
    }

}