import { Component } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
    selector: 'dg-stats',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    constructor(
        public alertService: AlertService,
    ) { }

}
