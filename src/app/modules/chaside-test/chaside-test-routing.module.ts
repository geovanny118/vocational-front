import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChasideTestComponent } from '.';
import { TestApplicationComponent, TestResultComponent, TestUniversityComponent } from './pages';

const routes: Routes = [
  { path: '', title: 'Chaside Test', component: ChasideTestComponent },
  { path: 'test', title: 'Test', component: TestApplicationComponent },
  { path: 'result', title: 'Resultados', component: TestResultComponent },
  { path: 'universities', title: 'Universidades', component: TestUniversityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChasideTestRoutingModule { }
