import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UserModule { }
