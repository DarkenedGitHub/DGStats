var DGSTATS = DGSTATS || {};

DGSTATS.calc = (function() {

    function columnMetrix(rounds, selector, par) {
        let scores = _.compact((rounds.map(selector)));
        if (scores && scores.length) {
            return {
                par: par || null,
                min: scores.reduce((min, curr) => Math.min(min, curr)),
                max: scores.reduce((max, curr) => Math.max(max, curr)),
                avg: Math.round(scores.reduce((sum, curr) => sum + curr) / scores.length * 10) / 10,
            };
        } else {
            return {};
        }
    }

    function sumIfValid(scores) {
        return scores.length > 0 && scores.length === _.compact(scores).length 
            ? scores.reduce((sum, curr) => sum + curr) 
            : null;
    }

    function rowMetrix(scores) {
        let partialScores = {
            f9: scores.length === 18 ? scores.slice(0, 9) : [],
            b9: scores.length === 18 ? scores.slice(9, 18) : [],
            sum: scores,
        }
        let metrix = {};
        for (metric in partialScores) {
            let value = sumIfValid(partialScores[metric]);
            if (value) {
                metrix[metric] = value;
            }
        }
        return metrix;
    }

    return {
        columnMetrix: columnMetrix,
        rowMetrix: rowMetrix,
    }

})();