import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IcfesComponent } from '.';

const routes: Routes = [
  { path: '', title: 'Icfes', component: IcfesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcfesRoutingModule { }
