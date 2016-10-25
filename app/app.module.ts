import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { OverviewModule } from './overview/overview.module';

declare var DGStatsStartTime: number;

@NgModule({
  imports:      [ BrowserModule, OverviewModule ],
  declarations: [ AppComponent ],
  providers:    [ { provide: 'DGStatsStartTime',  useValue: DGStatsStartTime } ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
