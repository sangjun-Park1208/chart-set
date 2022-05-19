import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { CircleDiagramComponent } from './circle-diagram/circle-diagram.component';

const routes: Routes = [
  { path: '', component: BarChartComponent },
  { path: 'barChart', component: BarChartComponent },
  { path: 'scatterChart', component: ScatterPlotComponent},
  { path: 'circle-Diagram', component: CircleDiagramComponent }

];

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }