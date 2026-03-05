import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginFormComponent } from '../../organisms/login-form/login-form.component';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, RouterLink],
  templateUrl: './login.component.html'
})

export default class LoginComponent {}
