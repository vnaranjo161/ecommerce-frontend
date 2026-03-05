import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterFormComponent } from '../../organisms/register-form/register-form.component';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent, RouterLink],
  templateUrl: './register.component.html'
})
export default class RegisterComponent {}
