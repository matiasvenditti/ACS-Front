import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logIn() {
    localStorage.setItem('token', 'logged');
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
