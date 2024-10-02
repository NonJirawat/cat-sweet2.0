import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth/login';  // URL ของ API สำหรับ login

  constructor(private http: HttpClient) { }

  // ฟังก์ชันสำหรับการเข้าสู่ระบบ
  login(email: string, password: string): Observable<any> {
    const loginData = {
      Email: email,
      Password: password
    };
    return this.http.post<any>(this.apiUrl, loginData);
  }
}
