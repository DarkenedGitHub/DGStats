Vue.component("result-table", {
    template: `
        <table class="table table-bordered table-condensed">
            <tr class="headline">
                <td>#</td>
                <td>date</td>
                <td>comment</td>
                <td v-for="(par, holeIndex) in course.pars" class="throws">{{ holeIndex + 1 }}</td>
                <td v-for="rowMetric in rowMetricNames">{{ rowMetric }}</td>
            </tr>
            <tr class="metric" v-for="metric in ['par', 'min', 'avg', 'max']">
                <td></td>
                <td></td>
                <td>{{ metric }}</td>
                <td v-for="(par, holeIndex) in course.pars" class="throws">{{ columnMetrix[holeIndex][metric] }}</td>
                <td v-for="(rowMetric, rowMetricIndex) in rowMetricNames" class="throws">{{ columnMetrix[holeCount + rowMetricIndex][metric] }}</td>
            </tr>
            <tr v-for="(round, roundIndex) in rounds">
                <td>{{ roundIndex + 1 }}</td>
                <td>{{ round.date }}</td>
                <td>{{ round.comment }}</td>
                <colored-cell v-for="(par, holeIndex) in course.pars" 
                    :score="round.scores[holeIndex]"
                    :metrix="columnMetrix[holeIndex]" 
                    :scheme="colorScheme" 
                    :key="holeIndex">
                </colored-cell>
                <colored-cell v-for="(rowMetric, rowMetricIndex) in rowMetricNames" 
                    :score="rowMetrix[roundIndex][rowMetric]"
                    :metrix="columnMetrix[holeCount + rowMetricIndex]" 
                    :scheme="colorScheme" 
                    :key="rowMetricIndex">
                </colored-cell>
            </tr>
        </table>
    `,
    props: ['course', 'rounds', 'colorScheme'],
    computed: {
        holeCount: function() {
            return this.course.pars.length;
        },
        rowMetrix: function() {
            return this.rounds.map(round => DGSTATS.calc.rowMetrix(round.scores));
        },
        rowMetricNames: function() {
            return _.uniq(_.flatMap(this.rowMetrix.map(Object.keys)));
        },
        columnMetrix: function() {
            let allMetrix = [];
            for (let holeIndex = 0; holeIndex < this.holeCount; holeIndex++) {
                allMetrix.push(DGSTATS.calc.columnMetrix(this.rounds, round => round.scores[holeIndex], this.course.pars[holeIndex]));
            }
            for (let rowMetricIndex = 0; rowMetricIndex < this.rowMetricNames.length; rowMetricIndex++) {
                let rowMetric = this.rowMetricNames[rowMetricIndex];
                let pars = {
                    sum: _.sum(this.course.pars),
                    f9: _.sum(this.course.pars.slice(0, 9)),
                    b9: _.sum(this.course.pars.slice(9, 18)),
                }; 
                allMetrix.push(DGSTATS.calc.columnMetrix(this.rounds, round => this.rowMetrix[this.rounds.indexOf(round)][rowMetric], pars[rowMetric]));
            }
            return allMetrix;
        },
    }
});
