import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementComponent } from './increment/increment.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';



@NgModule({
  declarations: [
    IncrementComponent,
    DoughnutChartComponent
  ],
  exports: [
    IncrementComponent,
    DoughnutChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
  ]
})
export class ComponentsModule { }
