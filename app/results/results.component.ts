import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MetricsService, Round } from './services/metrics.service';
import { ColorMapService } from './services/colormap.service';

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

    constructor(private http: Http, private metricsService: MetricsService, private colorMapService: ColorMapService, @Inject('DGStatsStartTime') private starttime: number) {
        this.loadTime = new Date().getTime() - starttime;
        this.allRounds = [];
        this.updateData();
    }

    ngOnInit() {
        this.http.get('app/data/data.csv').subscribe(result => this.processCSVData(result));
    }

    processCSVData(csvData: Response) {
        var textData = csvData.text();
        var lineArray = textData.split('\r\n');
        this.allRounds = lineArray.map(function(line) {
            var values = line.split('\t');
            return new Round(
                new Date(values[1].split('.').reverse()),
                values[2],
                values.slice(4).map(strVal => strVal ? +strVal : null));
        });
        let holeCount = this.allRounds.map(round => round.throws.length).reduce((a, b) => Math.max(a, b));
        this.metricsService.course = [];
        for (let holeIndex = 0; holeIndex < holeCount; holeIndex++) {
            this.metricsService.course.push(3);
        }
        this.updateData();
    }

    updateData() {
        this.metricsService.rounds = (this.showLast10 && this.allRounds.length > 10) ? this.allRounds.slice(-10) : this.allRounds;
        this.showOffset = this.allRounds.length - this.metricsService.rounds.length;
        this.metricsService.calculateAllMetrics();
        this.colorMapService.createColorMap();
    }

}