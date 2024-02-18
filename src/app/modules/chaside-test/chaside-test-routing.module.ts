import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChasideTestComponent } from '.';
import { TestApplicationComponent } from './pages'; 

const routes: Routes = [
  { path: '', title: 'Chaside Test', component: ChasideTestComponent },
  { path: 'test', title: 'Test', component: TestApplicationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChasideTestRoutingModule { }
