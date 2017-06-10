import { Component, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'doinput',
    templateUrl: 'input.component.html'
})
export class InputComponent {

    rawData: string;

    doUpdate() {
        console.log("test");
    }

}