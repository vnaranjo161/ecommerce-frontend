import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  id = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
}
