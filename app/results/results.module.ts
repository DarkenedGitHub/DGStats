import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';

import { ResultsComponent } from './results.component';
import { MetricsService } from './services/metrics.service';
import { ColorMapService } from './services/colormap.service';

@NgModule({
    imports: [ CommonModule, FormsModule, HttpModule, NgbModule, MyDatePickerModule ],
    declarations: [ ResultsComponent ],
    providers: [ MetricsService, ColorMapService ],
    exports: [ ResultsComponent ]
})
export class ResultsModule {

}