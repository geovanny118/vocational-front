import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChasideTestRoutingModule } from './chaside-test-routing.module';
import { ChasideTestComponent } from './chaside-test.component';


@NgModule({
  declarations: [ChasideTestComponent],
  imports: [
    CommonModule,
    ChasideTestRoutingModule
  ]
})
export class ChasideTestModule { }
