import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HollandTestComponent } from './holland-test.component';
import { TestApplicationComponent, TestResultComponent } from './pages';

const routes: Routes = [
  { path: '', title: 'Holland Test', component: HollandTestComponent },
  { path: 'test', title: 'Test', component: TestApplicationComponent },
  { path: 'result', title: 'Resultados', component: TestResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HollandTestRoutingModule { }
