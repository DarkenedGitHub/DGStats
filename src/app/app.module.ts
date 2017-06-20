import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ScorePipe } from './pipes/score.pipe';

import { AppComponent }  from './app.component';
import { InputComponent } from './input/input.component';
import { CoursesComponent } from './courses/courses.component';
import { ResultsComponent } from './results/results.component';
import { DataComponent } from './data/data.component';

import { DataService } from './data/data.service';
import { ImportService } from './data/import.service';

const appRoutes : Routes =  [
  { path: '', redirectTo: 'results', pathMatch: 'full' },
  { path: 'results', component: ResultsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'input', component: InputComponent },
  { path: 'data', component: DataComponent },
  { path: '**', redirectTo: 'results' },
];

@NgModule({
  declarations: [
    ScorePipe,
    AppComponent,
    ResultsComponent,
    CoursesComponent,
    InputComponent,
    DataComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
  ],
  providers: [ 
    DataService,
    ImportService,
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
