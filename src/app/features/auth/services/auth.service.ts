import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Credentials } from './../models/credentials.interface';
import { User } from '../models/user.interface';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged: boolean = false;
  private userLogged: User;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.logged = this.isSavedInStorage();
    this.userLogged = this.getUserFromStorage();
  }

  login(credentials: Credentials, remember: boolean): Observable<any>
  {
    const url = environment.API_URL + '/login';
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
    this.storage.cleanStorage();
    this.logged = false;
    this.userLogged = null;
  }

  private readData(user: User, token: string, remember: boolean): void
  {
    this.storage
        .setDefault(remember)
        .setItem('user', user, true)
        .setItem('token', token)
  }

  private isSavedInStorage(): boolean
  {
    return this.storage.getItem('token') !== null;
  }

  private getUserFromStorage(): User
  {
    return this.storage.getItem('user', true);
  }

}
