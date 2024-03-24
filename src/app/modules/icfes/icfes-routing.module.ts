import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IcfesComponent } from '.';
import { IcfesScoreViewerComponent } from './pages';

const routes: Routes = [
  { path: '', title: 'Icfes', component: IcfesComponent },
  { path: 'dashboard', title: 'Icfes', component: IcfesScoreViewerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcfesRoutingModule { }
