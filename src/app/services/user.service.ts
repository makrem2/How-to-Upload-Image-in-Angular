import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  createuser(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/createuser`, formData);
  }
}
