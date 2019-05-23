import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>(`${environment.baseUrl}/user`, user);
  }
}
