import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ChasideTestRoutingModule } from './chaside-test-routing.module';
import { ChasideTestComponent } from './chaside-test.component';

@NgModule({
  declarations: [ChasideTestComponent],
  imports: [
    CommonModule,
    ChasideTestRoutingModule,
    MatDialogModule
  ]
})
export class ChasideTestModule { }
