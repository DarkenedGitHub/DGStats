import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { InputComponent } from './input/input.component';
import { ResultsComponent } from './results/results.component';

import { ColorMapService } from './results/colormap.service';

const appRoutes : Routes =  [
  { path: '', redirectTo: 'results', pathMatch: 'full' },
  { path: 'results', component: ResultsComponent },
  { path: 'input', component: InputComponent },
  { path: '**', redirectTo: 'results' }
];

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [ 
    ColorMapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
