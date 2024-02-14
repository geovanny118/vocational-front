import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChasideTestComponent } from '.';

const routes: Routes = [
  { path: '', title: 'Chaside Test', component: ChasideTestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChasideTestRoutingModule { }
