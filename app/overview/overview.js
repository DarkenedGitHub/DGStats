'use strict';

angular.module('myApp.overview', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/overview', {
    templateUrl: 'overview/overview.html',
    controller: 'OverviewCtrl'
  });
}])

.controller('OverviewCtrl', function($scope, $http) {
    var calcValidValues = function(extractor) {
        return $scope.rounds
            .map(function(round) { return parseInt(extractor(round)); })
            .filter(function(value) { return !isNaN(value); });
    }
    var calcByHoleMetric = function(reduction, finishing) {
        if (!finishing) { finishing = function(x) { return x; }; }
        var range = [];
        for (; range.length < 18; range[range.length] = 0);
        return range.map(function(hole, index) {
            var throwCounts = calcValidValues(function(round) { return round.throws[index]; });
            return finishing(throwCounts.reduce(reduction), throwCounts.length);
        });
    }
    $scope.calcColor = function(round, $index) {
        var min = $scope.minRoundThrows[$index];
        var avg = $scope.avgRoundThrows[$index];
        var max = $scope.maxRoundThrows[$index];
        var curr = round.throws[$index];
        var maxLight = 100;
        var greenVal = curr < avg ? maxLight : maxLight -  Math.round(maxLight * (curr - avg) / (max - avg));
        var redVal = curr > avg ? maxLight : maxLight -  Math.round(maxLight * (curr - avg) / (min - avg));
        return 'rgb(' + redVal + ', ' + greenVal + ', 0)';
    }

    $scope.updateData = function() {
        $scope.rounds = $scope.showLast10 ? $scope.allRounds.slice(-10) : $scope.allRounds;
        $scope.showOffset = $scope.allRounds.length - $scope.rounds.length;
        $scope.avgRoundThrows = calcByHoleMetric(
            function(sum, summand) { return sum + summand; }, 
            function(reduced, count) { return reduced / count; }
        );
        $scope.minRoundThrows = calcByHoleMetric(function(a, b) { return Math.min(a, b); });
        $scope.maxRoundThrows = calcByHoleMetric(function(a, b) { return Math.max(a, b); });
    };

    $http.get('/overview/data.csv').then(function(result) {
        var textData = result.data;
        var lineArray = textData.split('\r\n');
        $scope.allRounds = lineArray.map(function(line) {
            var values = line.split('\t');
            return {
                date: values[1],
                note: values[2],
                throws: values.slice(4)
            };
        });
        $scope.updateData();
    }, function(error) {
        console.log(error);
    });
});