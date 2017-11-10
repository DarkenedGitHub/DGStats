Vue.component('results', {
    template: `
        <div>
            <div class="container-fluid">
                <h1>{{ course.name }}</h1>
                <result-table 
                    :course="course"
                    :rounds="rounds"
                    :color-scheme="colorScheme">
                </result-table>
            </div>

            <footer class="navbar navbar-toggleable-xl navbar-inverse fixed-bottom">
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#toolbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="toolbar">
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-primary" v-for="schemeName in colorSchemes" :class="{ active: colorScheme === schemeName }">
                            <input type="radio" name="schemeName" :value="schemeName" v-model="colorScheme">{{ schemeName }}
                        </label>
                    </div>
                </div>
            </footer>
        </div>
    `,
    data: function() {
        return {
            course: DGSTATS.import.data.course,
            rounds: DGSTATS.import.data.rounds,
            colorSchemes: DGSTATS.colors.availableSchemes,
            colorScheme: 'none',
        };
    },
});
