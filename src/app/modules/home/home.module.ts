import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BodyComponent, HeaderComponent, InformacionComponent, ServiciosComponent, TestComponent } from './components';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    HomeRoutingModule,
    HeaderComponent,
    BodyComponent,
    ServiciosComponent,
    TestComponent,
    InformacionComponent
  ]
})
export class HomeModule { }
