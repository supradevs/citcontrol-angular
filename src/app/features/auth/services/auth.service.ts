import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Credentials } from './../models/credentials.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged: boolean = false;
  private userLogged: User;

  constructor(private http: HttpClient) {
    this.logged = this.isSavedInStorage();
    this.userLogged = this.getUserFromStorage();
  }

  login(credentials: Credentials, remember: boolean): Observable<any>
  {
    const url = environment.API_URL + '/login';
    const headers = new HttpHeaders({'AcceptZZ':'application/json', 'Content-type': 'application/json'});
    return this.http.post(url, credentials)
      .pipe(
        map((res:any) => {
          this.logged = true;
          this.userLogged = {role:res.data.role, ...res.data.user};
          this.readData(this.userLogged, res.data.token, remember);
          return res.data.role;
        })
      )
  }

  isLogged(): boolean
  {
    return this.logged;
  }

  user():User
  {
    return this.userLogged;
  }

  logout(): void
  {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.logged = false;
    this.userLogged = null;
  }

  private readData(user: User, token: string, remember: boolean): void
  {
    const userStr = JSON.stringify(user);

    if(remember){
      localStorage.setItem('user', userStr);
      localStorage.setItem('token', token);
    }
    else{
      sessionStorage.setItem('user', userStr);
      sessionStorage.setItem('token', token);
    }
  }


  private isSavedInStorage(): boolean
  {
    return localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null;
  }

  private getUserFromStorage(): User
  {
    const session = sessionStorage.getItem('user');
    const local = localStorage.getItem('user');

    if( session !== null)
    {
      return JSON.parse( session );
    }
    else if( local !== null)
    {
      return JSON.parse( local );
    }

    return null
  }

}
