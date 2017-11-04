var DGSTATS = DGSTATS || {};

DGSTATS.colors = (function() {

    let schemes = [
        {
            name: 'par',
            requiredMetricNames: ['par'],
            algorithm: function(metrix, value) {
                let toPar = value - metrix.par;
                if (toPar < -1) {
                    return 'darkyellow';
                } else if (toPar < 0) {
                    return 'darkgreen';
                } else if (toPar > 0) {
                    return 'darkred';
                } else {
                    return null;
                }
            }
        }, 
        {
            name: 'minmax',
            requiredMetricNames: ['min', 'max'],
            algorithm: function(metrix, value) {
                if (value === metrix.min) {
                    return 'darkgreen';
                } else if (value === metrix.max) {
                    return 'darkred';
                } else {
                    return null;
                }
            }
        },
        {
            name: '+/- hard',
            requiredMetricNames: ['avg'],
            algorithm: function(metrix, value) {
                if (value > metrix.avg) {
                    return 'darkred';
                } else {
                    return 'darkgreen';
                }
            }
        },
        {
            name: '+/- smooth',
            requiredMetricNames: ['min', 'avg', 'max'],
            algorithm: function(metrix, value) {
                let target = value < metrix.avg ? metrix.min : metrix.max;
                let relative = (value - target) / (metrix.avg - target);
                if (value < metrix.avg) {
                    return 'rgb(' + Math.round(128 * relative) + ', 128, 0)';
                } else {
                    return 'rgb(128, ' + Math.round(128 * relative) + ', 0)';                    
                }
            }
        }
    ];

    function calcColor(schemeName, metrix, value) {
        if (!value) {
            return null;
        }
        let scheme = schemes.find(scheme => scheme.name === schemeName);
        if (scheme && scheme.requiredMetricNames.every(metricName => metrix[metricName])) {
            return scheme.algorithm(metrix, value);
        }
        return null;
    }

    return {
        availableSchemes: schemes.map(scheme => scheme.name).concat('none'),
        calcColor: calcColor
    }

})();