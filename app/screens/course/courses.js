Vue.component('courses', {
    template: `
        <div>
            <div class="container-fluid">
                <h1>Courses</h1>
                <table class="table table-bordered table-condensed">
                    <tr class="headline">
                        <th>Name</th>
                        <th v-for="(_, holeIndex) in maxHoleCount">#{{ holeIndex + 1 }}</th>
                    </tr>
                    <tr v-for="course in courses">
                        <td>{{ course.name }}</td>
                        <td v-for="par in course.pars" class="throws">{{ par }}</td>
                    </tr>
                </table>
            </div>

            <footer class="navbar navbar-expand navbar-inverse fixed-bottom">
                <div id="toolbar">
                    <button class="btn btn-primary" @click="DGSTATS.router.navigateTo(createCourse)">Create new</button>
                </div>
            </footer>
        </div>
    `,
    data: function() {
        return {
            courses: DGSTATS.import.courses,
        };
    },
    computed: {
        maxHoleCount: function() {
            return _.max(this.courses.map(course => course.pars.length));
        },
    },
});
