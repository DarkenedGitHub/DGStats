var DGSTATS = DGSTATS || {};

DGSTATS.import = (function() {
    
    var data = {
        course: {
            name: "Westpark",
            pars: _.range(18).map(() => 3)
        },
        rounds: []
    }

    var reset = function() {
        axios.get('data.csv').then(function(response) {
            var rawData = response.data;
            var lines = rawData.split('\n');
            lines.forEach(function(line) {
                var parts = _.trim(line).split('\t');
                var round = {
                    date: parts[1],
                    comment: parts[2],
                    scores: _.range(data.course.pars.length).map(holeIndex => parts[holeIndex + 4]).map(score => score ? +score : score)
                };
                data.rounds.push(round);
            });
        }).catch(function(error){
            console.log(error.statusText);
        });
    }

    return {
        data: data,
        reset: reset
    }
    
})();