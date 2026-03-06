import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormFieldComponent } from '../../../../shared/components/molecules/form-field/form-field.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { AlertComponent } from '../../../../shared/components/atoms/alert/alert.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, FormFieldComponent, ButtonComponent, AlertComponent],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.form.value;

    this.authService.register({
      name: name!,
      email: email!,
      password: password!
    }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.error ?? 'Ocurrió un error al registrarse');
      }
    });
  }
}
