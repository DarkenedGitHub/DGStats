Vue.component('router-link', {
    template: '<a href="#" @click="navigate"><slot></slot></a>',
    props: ['component'],
    methods: {
        navigate: function() {
            DGSTATS.router.navigateTo(this.component);
        }
    }
});
