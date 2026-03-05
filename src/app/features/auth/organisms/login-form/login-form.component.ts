import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
        console.log('Éxito:', response);
        this.form.reset();
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
