import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverviewComponent } from './overview.component';

@NgModule({
    imports: [ CommonModule, FormsModule, HttpModule, NgbModule ],
    declarations: [ OverviewComponent ],
    exports: [ OverviewComponent ]
})
export class OverviewModule {

}