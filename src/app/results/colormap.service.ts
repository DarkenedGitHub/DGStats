import { Injectable } from '@angular/core';
import { Course, Round } from './model';
import { Matrix } from './matrix';

@Injectable()
export class ColorMapService {

    createColorMap(type: string, matrix: Matrix): string[][] {
        let startTime = new Date().getTime();
        var colorMap: string[][] = [];
        for (var roundIndex = 0; roundIndex < matrix.roundLines.length; roundIndex++) {
            colorMap[roundIndex] = [];
        }
        if (type === 'par') {
            this.fillForPar(colorMap, matrix);
//        } else if (type === 'newbest') {
  //          this.fillForNewBest(colorMap, matrix);
    //    } else if (type === 'best') {
      //      this.fillForBest(colorMap, matrix);
        }
        let endTime = new Date().getTime();
        console.log('colormapping took: ', endTime - startTime, 'ms');
        return colorMap;
    }

    fillForPar(colorMap: string[][], matrix: Matrix) {
        var parMetric = matrix.metricLines.find(metricLine => metricLine.id === 'par');
        for (var lineIndex = 0; lineIndex < matrix.roundLines.length; lineIndex++) {
            var line = matrix.roundLines[lineIndex]
            for (var cellIndex = 0; cellIndex < line.cells.length; cellIndex++) {
                var cell = line.cells[cellIndex];
                var par = parMetric.cells[cellIndex];
                if (cell) {
                    if (cell.value < par.value) {
                        colorMap[lineIndex][cellIndex] = 'darkgreen';
                    } else if (cell.value > par.value) {
                        colorMap[lineIndex][cellIndex] = 'darkred';
                    }
                }
            }
        }
    }

    fillForNewBest(colorMap: string[][], rounds: Round[], course: Course) {
        var bests: number[] = [];
        for (var roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
            var round = rounds[roundIndex];
            for (var holeIndex = 0; holeIndex < course.holes.length; holeIndex++) {
                var hole = course.holes[holeIndex];
                var score = round.scores.find(score => score.hole === hole);
                if (score && score.throws) {
                    if (!bests[holeIndex] || bests[holeIndex] >= score.throws) {
                        bests[holeIndex] = score.throws;
                        colorMap[roundIndex][holeIndex] = 'darkgreen';
                    }
                }
            }
        }
    }

    fillForBest(colorMap: string[][], rounds: Round[], course: Course) {
        var bests: number[] = [];
        for (var roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
            var round = rounds[roundIndex];
            for (var holeIndex = 0; holeIndex < course.holes.length; holeIndex++) {
                var hole = course.holes[holeIndex];
                var score = round.scores.find(score => score.hole === hole);
                if (score && score.throws) {
                    if (!bests[holeIndex] || bests[holeIndex] > score.throws) {
                        bests[holeIndex] = score.throws;
                    }
                }
            }
        }
        for (var roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
            var round = rounds[roundIndex];
            for (var holeIndex = 0; holeIndex < course.holes.length; holeIndex++) {
                var hole = course.holes[holeIndex];
                var score = round.scores.find(score => score.hole === hole);
                if (score && score.throws) {
                    if (bests[holeIndex] === score.throws) {
                        colorMap[roundIndex][holeIndex] = 'darkgreen';
                    }
                }
            }
        }
    }

}