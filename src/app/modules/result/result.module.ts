import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { ResultRoutingModule } from './result-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    ResultRoutingModule,
    NgxChartsModule,
    MatProgressSpinnerModule
  ]
})
export class ResultModule { }
