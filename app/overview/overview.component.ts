import { Component, OnInit } from '@angular/core';
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

    constructor(private http: Http) {
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

    calcValidValues(extractor) {
        return this.rounds
            .map(function(round) { return parseInt(extractor(round)); })
            .filter(function(value) { return !isNaN(value); });
    }
    calcByHoleMetric(reduction, finishing:any=false) {
        if (!finishing) { finishing = function(x) { return x; }; }
        var range = [];
        for (; range.length < 18; range[range.length] = 0);
        return range.map(function(hole, index) {
            var throwCounts = this.calcValidValues(function(round) { return round.throws[index]; });
            return finishing(throwCounts.reduce(reduction), throwCounts.length);
        });
    }
    calcColor(round, $index) {
        if (this.minRoundThrows) {
            var min = this.minRoundThrows[$index];
            var avg = this.avgRoundThrows[$index];
            var max = this.maxRoundThrows[$index];
            var curr = round.throws[$index];
            var maxLight = 100;
            var greenVal = curr < avg ? maxLight : maxLight -  Math.round(maxLight * (curr - avg) / (max - avg));
            var redVal = curr > avg ? maxLight : maxLight -  Math.round(maxLight * (curr - avg) / (min - avg));
            return 'rgb(' + redVal + ', ' + greenVal + ', 0)';
        } else {
            return '';
        }
    }

    updateData() {
        console.log("modelchange");
        this.rounds = this.showLast10 ? this.allRounds.slice(-10) : this.allRounds;
        this.showOffset = this.allRounds.length - this.rounds.length;
        this.avgRoundThrows = this.calcByHoleMetric(
            function(sum, summand) { return sum + summand; }, 
            function(reduced, count) { return reduced / count; }
        );
        this.minRoundThrows = this.calcByHoleMetric(function(a, b) { return Math.min(a, b); });
        this.maxRoundThrows = this.calcByHoleMetric(function(a, b) { return Math.max(a, b); });
    }

}