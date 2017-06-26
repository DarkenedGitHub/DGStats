import { Component } from '@angular/core';

import { DataService } from './data.service';
import { ImportService } from './import.service';

@Component({
    moduleId: module.id,
    selector: 'datafunctions',
    templateUrl: 'data.component.html',
})
export class DataComponent {

    constructor(
        public dataService: DataService,
        public importService: ImportService,
    ) {}
    
}