import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/api/auth/register';  // URL ของ API สำหรับการลงทะเบียน

  constructor(private http: HttpClient) {}

  register(nameUser: string, email: string, password: string): Observable<any> {
    const registerData = {
      NameUser: nameUser,
      Email: email,
      Password: password
    };
    return this.http.post<any>(this.apiUrl, registerData);
  }
}
