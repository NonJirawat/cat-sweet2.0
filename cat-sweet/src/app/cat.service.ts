import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private apiUrl = 'http://localhost:3000/api/cats';  // Adjust the URL to match your backend API

  constructor(private http: HttpClient) { }

  // Fetch all cat profiles
  getCats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Upload a new cat profile with image
  addCat(catData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, catData);
  }
}
