import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        Swal.fire('Success', 'Logged in successfully', 'success');
        this.router.navigate(['/home']);
      },
      error => {
        Swal.fire('Error', 'Invalid email or password', 'error');
      }
    );
  }
}
