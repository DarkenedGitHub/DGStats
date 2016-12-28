import { Injectable } from '@angular/core';
import { MetricsService } from './metrics.service';

@Injectable()
export class ColorMapService {

    colorMap: string[][];

    constructor(private metricsService: MetricsService) {

    }

    calcColor(throws, holeIndex) {
        if (isNaN(throws)) {
            return '';
        }
        var min = this.metricsService.byHoleMetric['min'][holeIndex];
        var avg = this.metricsService.byHoleMetric['avg'][holeIndex];
        var max = this.metricsService.byHoleMetric['max'][holeIndex];
        var maxLight = 100;
        var greenVal = throws < avg ? maxLight : maxLight -  Math.round(maxLight * (throws - avg) / (max - avg));
        var redVal = throws > avg ? maxLight : maxLight -  Math.round(maxLight * (throws - avg) / (min - avg));
        return 'rgb(' + redVal + ', ' + greenVal + ', 0)';
    }

    createColorMap() {
        this.colorMap = [];
        for (let roundIndex = 0; roundIndex < this.metricsService.rounds.length; roundIndex++) {
            this.colorMap[roundIndex] = [];
            for (let holeIndex = 0; holeIndex < this.metricsService.course.pars.length; holeIndex++) {
                let throws = this.metricsService.rounds[roundIndex].throws[holeIndex];
                if (throws) {
                    this.colorMap[roundIndex][holeIndex] = this.calcColor(throws, holeIndex);
                }
            }
        }
    }

}