import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { CircleDiagramComponent } from './circle-diagram/circle-diagram.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    ScatterPlotComponent,
    CircleDiagramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
