import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultsComponent } from './results.component';
import { MetricService } from './services/metrics.service';

@NgModule({
    imports: [ CommonModule, FormsModule, HttpModule, NgbModule ],
    declarations: [ ResultsComponent ],
    providers: [ MetricService ],
    exports: [ ResultsComponent ]
})
export class ResultsModule {

}