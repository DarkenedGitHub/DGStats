import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'overview',
    templateUrl: 'overview.component.html'
})
export class OverviewComponent implements OnInit {
    showLast10: boolean = false;
    rounds;
    showOffset;
    minRoundThrows;
    avgRoundThrows;
    maxRoundThrows;
    allRounds;
    colorMap;
    loadTime;

    constructor(private http: Http, @Inject('DGStatsStartTime') private starttime: number) {
        this.loadTime = new Date().getTime() - starttime;
    }

    ngOnInit() {
        this.http.get('app/overview/data.csv').subscribe(result => this.processCSVData(result));
    }

    processCSVData(csvData: Response) {
        var textData = csvData.text();
        var lineArray = textData.split('\r\n');
        this.allRounds = lineArray.map(function(line) {
            var values = line.split('\t');
            return {
                date: values[1],
                note: values[2],
                throws: values.slice(4)
            };
        });
        this.updateData();
    }

    calcValidValues(rounds, extractor) {
        return rounds
            .map(function(round) { return parseInt(extractor(round)); })
            .filter(function(value) { return !isNaN(value); });
    }
    calcByHoleMetric(rounds, reduction, finishing:any=false) {
        if (!finishing) { finishing = function(x) { return x; }; }
        var range = [];
        for (; range.length < 18; range[range.length] = 0);
        let component = this;
        return range.map(function(hole, index) {
            var throwCounts = component.calcValidValues(rounds, function(round) { return round.throws[index]; });
            return finishing(throwCounts.reduce(reduction), throwCounts.length);
        });
    }
    calcColor(throws, holeIndex) {
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
    }

    updateData() {
        this.rounds = [];
        var rounds = this.showLast10 ? this.allRounds.slice(-10) : this.allRounds;
        // column metrics
        this.avgRoundThrows = this.calcByHoleMetric(rounds,
            function(sum, summand) { return sum + summand; }, 
            function(reduced, count) { return reduced / count; }
        );
        this.minRoundThrows = this.calcByHoleMetric(rounds, function(a, b) { return Math.min(a, b); });
        this.maxRoundThrows = this.calcByHoleMetric(rounds, function(a, b) { return Math.max(a, b); });
        // colors
        this.colorMap = [];
        for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
            this.colorMap[roundIndex] = [];
            for (let holeIndex = 0; holeIndex < this.minRoundThrows.length; holeIndex++) {
                let throws = rounds[roundIndex].throws[holeIndex];
                if (throws) {
                    this.colorMap[roundIndex][holeIndex] = this.calcColor(throws, holeIndex);
                }
            }
        }
        // set model
        this.rounds = rounds;
        this.showOffset = this.allRounds.length - rounds.length;
    }

}