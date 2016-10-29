import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ResultsModule } from './results/results.module';

declare var DGStatsStartTime: number;

@NgModule({
  imports:      [ BrowserModule, ResultsModule ],
  declarations: [ AppComponent ],
  providers:    [ { provide: 'DGStatsStartTime',  useValue: DGStatsStartTime } ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
