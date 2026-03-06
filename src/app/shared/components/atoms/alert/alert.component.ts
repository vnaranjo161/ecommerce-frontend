import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  message = input.required<string>();
  closed = output<void>();
}
