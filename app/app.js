DGSTATS.import.reset();

new Vue({
    el: '#app',
    data: {
        course: DGSTATS.import.data.course,
        rounds: DGSTATS.import.data.rounds,
        colorSchemes: DGSTATS.colors.availableSchemes,
        colorScheme: 'none'
    }
});
