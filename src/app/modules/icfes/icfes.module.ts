import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcfesComponent } from './icfes.component';
import { IcfesRoutingModule } from './icfes-routing.module';


@NgModule({
  declarations: [IcfesComponent],
  imports: [
    CommonModule,
    IcfesRoutingModule
  ]
})
export class IcfesModule { }
