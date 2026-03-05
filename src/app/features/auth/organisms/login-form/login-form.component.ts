import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormFieldComponent } from '../../../../shared/components/molecules/form-field/form-field.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, FormFieldComponent, ButtonComponent],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.authService.login({
      email: email!,
      password: password!
    }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/products']);
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
