import { Injectable } from '@angular/core';
import{Http, Headers, RequestOptions} from '@angular/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken;
  user;
  options;

  domain = 'http://localhost:1200/'

  constructor(
    private http: Http,
  ) { }

  createAuthenticationHeaders(){
    this.loadToken();
    this.options = new RequestOptions({
      headers : new Headers({
        'content-Type': 'application/json',
        'authorization': this.authToken
      })
    })
  }

  loadToken(){
    this.authToken = localStorage.getItem('token');
  }

  registerUser(user){
    return this.http.post(this.domain + 'authentication/register', user).pipe(map(res => res.json()));
  }

  checkUsername(username){
    return this.http.get(this.domain + 'authentication/checkUsername/' +  username).pipe(map(res => res.json()));
  }

  checkEmail(email){
    return this.http.get(this.domain + 'authentication/checkEmail/'+ email).pipe(map(res => res.json()));
  }
login(user){
  return this.http.post(this.domain + 'authentication/login', user).pipe(map(res=> res.json()));
}

logout(){
  this.authToken = null;
  this.user = null;
  localStorage.clear();
}

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/profile' , this.options).pipe(map(res=> res.json()));
  }

  getPublicProfile(username){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain +  'authentication/publicProfile/' + username, this.options).pipe(map(res=>res.json()));
  }

  private helper = new JwtHelperService();

  loggedIn() {
    const token = localStorage.getItem('token');
    if(!token){
      return false;
    }
    return !this.helper.isTokenExpired(token);
  }


}


