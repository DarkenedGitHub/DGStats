var DGSTATS = DGSTATS || {};

DGSTATS.import = (function() {
    
    let courses = [
        {
            name: "Westpark",
            pars: _.range(18).map(() => 3)
        },
        {
            name: "Bürgerpark (rot)",
            pars: [3, 3, 3, 3, 3, 3, 4, 3, 3 ]
        },
        {
            name: "Bürgerpark (blau)",
            pars: [3, 3, 3, 3, 3, 5, 3, 3, 4, 3, 3, 3, 3, 3, 3 ]
        },
    ];

    let data = {
        course: {
            name: "Westpark",
            pars: _.range(18).map(() => 3)
        },
        rounds: []
    }

    function reset() {
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
        courses: courses,
        reset: reset
    }
    
})();