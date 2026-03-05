import { Component } from '@angular/core';
import { FormFieldComponent } from '../../../../shared/components/molecules/form-field/form-field.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';

@Component({
  selector: 'app-register-form',
  imports: [FormFieldComponent, ButtonComponent],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {}
