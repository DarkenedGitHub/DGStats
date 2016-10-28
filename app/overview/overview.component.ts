import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { OverviewService, Round } from './overview.service';

@Component({
    moduleId: module.id,
    selector: 'overview',
    templateUrl: 'overview.component.html'
})
export class OverviewComponent implements OnInit {
    showLast10: boolean = false;
    showOffset: number;
    colorMap: string[];
    loadTime: number;
    allRounds: Round[];

    constructor(private http: Http, private overviewService: OverviewService, @Inject('DGStatsStartTime') private starttime: number) {
        this.loadTime = new Date().getTime() - starttime;
        this.allRounds = [];
        this.updateData();
    }

    ngOnInit() {
        this.http.get('app/overview/data.csv').subscribe(result => this.processCSVData(result));
    }

    processCSVData(csvData: Response) {
        var textData = csvData.text();
        var lineArray = textData.split('\r\n');
        this.allRounds = lineArray.map(function(line) {
            var values = line.split('\t');
            return new Round(
                new Date(values[1].split('.').reverse()),
                values[2],
                values.slice(4).map(strVal => +strVal));
        });
        let holeCount = this.allRounds.map(round => round.throws.length).reduce((a, b) => Math.max(a, b));
        this.overviewService.course = [];
        for (let holeIndex = 0; holeIndex < holeCount; holeIndex++) {
            this.overviewService.course.push(3);
        }
        this.updateData();
    }

    /*calcColor(throws, holeIndex) {
        if (isNaN(throws)) {
            return '';
        }
        var min = this.minRoundThrows[holeIndex];
        var avg = this.avgRoundThrows[holeIndex];
        var max = this.maxRoundThrows[holeIndex];
        var maxLight = 100;
        var greenVal = throws < avg ? maxLight : maxLight -  Math.round(maxLight * (throws - avg) / (max - avg));
        var redVal = throws > avg ? maxLight : maxLight -  Math.round(maxLight * (throws - avg) / (min - avg));
        return 'rgb(' + redVal + ', ' + greenVal + ', 0)';
    }*/

    updateData() {
        this.overviewService.rounds = (this.showLast10 && this.allRounds.length > 10) ? this.allRounds.slice(-10) : this.allRounds;
        this.showOffset = this.allRounds.length - this.overviewService.rounds.length;
        this.overviewService.calculateAllMetrics();
        // colors
        this.colorMap = [];
/*        for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
            this.colorMap[roundIndex] = [];
            for (let holeIndex = 0; holeIndex < this.minRoundThrows.length; holeIndex++) {
                let throws = rounds[roundIndex].throws[holeIndex];
                if (throws) {
                    this.colorMap[roundIndex][holeIndex] = this.calcColor(throws, holeIndex);
                }
            }
        }*/
    }

}