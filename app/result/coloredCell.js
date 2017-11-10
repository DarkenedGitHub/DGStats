Vue.component("colored-cell", {
    template: `
        <td class="throws" :style="{ backgroundColor: calculatedColor}">
            {{ score }}
        </td>
    `,
    props: ['score', 'metrix', 'scheme'],
    computed: {
        calculatedColor: function() {
            return DGSTATS.colors.calcColor(this.scheme, this.metrix, this.score);
        }
    }
});
