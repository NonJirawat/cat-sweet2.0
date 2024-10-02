import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nameUser: string = '';
  email: string = '';
  password: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  onRegister() {
    this.registerService.register(this.nameUser, this.email, this.password).subscribe(
      response => {
        Swal.fire('Success', 'Registered successfully', 'success');
        this.router.navigate(['/login']);
      },
      error => {
        Swal.fire('Error', 'Registration failed', 'error');
      }
    );
  }
}
