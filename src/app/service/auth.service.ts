import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { PostService } from './post.service';

@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private postService: PostService,
    private config: ConfigService,
    private router: Router
  ) {
  }

  private access_token = null;

  login(user) {
    const loginHeaders = new HttpHeaders({
      /*'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'*/
    });
     //const body = `username=${user.username}&password=${user.password}`;
    const body = {
      'username': user.username,
      'password': user.password
    };
    return this.apiService.post(this.config.login_url, JSON.stringify(body), loginHeaders)
      .pipe(map((res) => {
        console.log('Login success');
        //this.access_token = res.accessToken;
        //localStorage.setItem("jwt", res.accessToken)
      }));
  }

  signup(user) {
    const signupHeaders = new HttpHeaders({
      //'Access-Control-Allow-Origin': '*',
      //'Accept': 'application/json',
      //'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.signup_url, JSON.stringify(user), signupHeaders)
      .pipe(map(() => {
        console.log('Sign up success');
      }));
  }

  createpost(post){
    const postHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.posts_url, JSON.stringify(post), postHeaders)
      .pipe(map(() => {
        console.log('Create post sucsess');
      }));
  }

  createcommunity(post){
    const postHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.community_url, JSON.stringify(post), postHeaders)
      .pipe(map(() => {
        console.log('Create community sucsess');
      }));
  }

  logout() {
    localStorage.removeItem('jwt')
    this.router.navigateByUrl('/home');
  }

  tokenIsPresent(): Boolean {
    let token = this.getToken()
    return token != null;
  }

  cookieIsPresent(): Boolean {
    let cookie = this.getToken()
    return cookie != null;
  }

  getToken() {
    let token = localStorage.getItem('jwt');
    return token
  }

  getUsername(): string {
    let token = this.parseToken();

    if (token) {
      return this.parseToken()['sub']
    }
    return "";
  }

  private parseToken() {
    let jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      return decodedJwtData;
    }
  }
}
