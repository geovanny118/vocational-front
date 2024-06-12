import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '.';
import { ChasideTestComponent, HollandTestComponent, InformacionPageComponent } from './pages';

const routes: Routes = [
  { path: '', title: 'Inicio', component: HomeComponent },
  { path: 'chaside', title: 'Chaside test', component: ChasideTestComponent },
  { path: 'holland', title: 'Holland test', component: HollandTestComponent },
  { path: 'informacion', title: 'informacion', component: InformacionPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
