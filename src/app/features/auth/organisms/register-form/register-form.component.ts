import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../../shared/components/molecules/form-field/form-field.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, FormFieldComponent, ButtonComponent],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {

  private authService = inject(AuthService);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
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
        console.log('Éxito:', response);
        this.form.reset();
      }, error: (err) => console.error('Error:', err),
    });
  }
}
