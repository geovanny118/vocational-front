import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HollandTestRoutingModule } from './holland-test-routing.module';
import { HollandTestComponent } from './holland-test.component';

@NgModule({
  declarations: [HollandTestComponent],
  imports: [
    CommonModule,
    HollandTestRoutingModule,
    MatDialogModule
  ]
})
export class HollandTestModule { }
