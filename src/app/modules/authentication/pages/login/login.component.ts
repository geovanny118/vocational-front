import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading: boolean = false;

  onLoginFormSubmit(isSubmitted: boolean) {
    this.loading = isSubmitted;
  }
}
