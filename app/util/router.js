var DGSTATS = DGSTATS || {};

DGSTATS.router = {
    navigateTo: function(route) {
        DGSTATS.router.currentRoute = route;
    },
    currentRoute: 'results'
};
