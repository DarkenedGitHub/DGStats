import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MetricsService, Round, Course } from './services/metrics.service';
import { ColorMapService } from './services/colormap.service';

class EditingRound {
    originalRoundIndex: number;
    round: Round;
    existing: boolean;
}

@Component({
    moduleId: module.id,
    selector: 'results',
    templateUrl: 'results.component.html'
})
export class ResultsComponent implements OnInit {
    showLast10: boolean = false;
    showOffset: number;
    loadTime: number;
    allRounds: Round[];
    editingRound: EditingRound;

    constructor(private http: Http, public metricsService: MetricsService, private colorMapService: ColorMapService) {
        this.allRounds = [];
        this.updateData();
    }

    ngOnInit() {
        this.http.get('./assets/data.csv').subscribe(result => this.processCSVData(result));
    }

    processCSVData(csvData: Response) {
        var textData = csvData.text();
        var lineArray = textData.split('\r\n');
        this.metricsService.course = new Course([]);
        for (let holeIndex = 0; holeIndex < 18; holeIndex++) {
            this.metricsService.course.pars.push(3);
        }
        this.metricsService.course.pars.push(54);
        this.metricsService.course.pars.push(27);
        this.metricsService.course.pars.push(27);
        let resultsRef = this;
        this.allRounds = lineArray.map(function(line) {
            var values = line.split('\t');
            return new Round(
                resultsRef.metricsService.course,
                new Date(values[1].split('.').reverse().join('.')),
                values[2],
                values.slice(4).map(strVal => strVal ? +strVal : null));
        });
        this.updateData();
    }

    updateData() {
        this.cancelEditing();
        this.metricsService.rounds = (this.showLast10 && this.allRounds.length > 10) ? this.allRounds.slice(-10) : this.allRounds;
        this.showOffset = this.allRounds.length - this.metricsService.rounds.length;
        this.metricsService.calculateAllMetrics();
        this.colorMapService.createColorMap();
    }

    onDateChanged(event:any) {
        if (event.date.year && event.date.month && event.date.day) {
            this.editingRound.round.date = new Date(event.date.year, event.date.month - 1, event.date.day);
        }
    }
    
    startEditing(roundIndex: number) {
        this.editingRound = new EditingRound();
        this.editingRound.existing = true;
        this.editingRound.originalRoundIndex = roundIndex;
        this.editingRound.round = this.metricsService.rounds[roundIndex].copy();
    }

    finishEditing() {
        this.metricsService.rounds[this.editingRound.originalRoundIndex].copyFrom(this.editingRound.round);
        delete this.editingRound;
        this.updateData();
    }

    cancelEditing() {
        delete this.editingRound;
    }

    removeRound(roundIndex: number) {
        if (confirm("really delete this?")) {
            this.allRounds.splice(roundIndex + this.showOffset, 1);
            this.updateData();
        }
    }

    startCreating() {
        let newRound = new Round(this.metricsService.course, new Date(), '', []);
        this.allRounds.push(newRound);
        this.updateData();
        this.startEditing(this.metricsService.rounds.length - 1);
    }

}