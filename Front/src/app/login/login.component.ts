import { Component } from '@angular/core';
import { Router } from '@angular/router'; // import Router
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // เพิ่มตัวแปรนี้เพื่อเก็บข้อความข้อผิดพลาด

  constructor(private authService: AuthService, private router: Router) {} // inject Router

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        Swal.fire('Success', 'Login successful', 'success');
        this.errorMessage = ''; // ล้างข้อความข้อผิดพลาด
        // เปลี่ยนไปหน้า Home หลังจาก Login สำเร็จ
        this.router.navigate(['/home']); // นำทางไปหน้า Home
      },
      error => {
        Swal.fire('Error', error.error.message, 'error');
        this.errorMessage = error.error.message; // เก็บข้อความข้อผิดพลาดในตัวแปร errorMessage
      }
    );
  }
}
