import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});

@Injectable({ providedIn: 'root' })
export class NotificationService {

  success(message: string) {
    Toast.fire({ icon: 'success', title: message });
  }

  error(message: string) {
    Toast.fire({ icon: 'error', title: message });
  }

}
