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
        private dataService: DataService,
        private importService: ImportService,
    ) {}
    
}