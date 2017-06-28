import { Component } from '@angular/core';

import { DataService } from './data.service';
import { ImportService } from './import.service';
import { AlertService} from '../alert.service';

@Component({
    moduleId: module.id,
    selector: 'datafunctions',
    templateUrl: 'data.component.html',
})
export class DataComponent {

    constructor(
        public dataService: DataService,
        public importService: ImportService,
        private alertService: AlertService,
    ) { }

    public downloadDBDump() {
        let blob = new Blob([JSON.stringify(this.dataService)], { type: 'application/json' });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "mydata.json";
        link.click();
    }

    public setImportFile(event) {
        let input = event.target;
        let reader = new FileReader();
        reader.onload = () => {
            this.dataService.load(reader.result);
        }
        reader.readAsText(input.files[0]);
        this.alertService.addAlert('imported data from file ' + input.files[0].name);
    }

}