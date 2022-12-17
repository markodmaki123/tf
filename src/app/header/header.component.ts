import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: String;

  constructor( private userService: UserService,  public router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  hasSignedIn(){
    return this.authService.tokenIsPresent()
  }

  userDetails(){
    this.router.navigate(["/"+this.authService.getUsername()+"/userdetails"])
  }

  updateUser(){
    this.router.navigate(["/"+this.authService.getUsername()+"/updateuser"])
  }

  changePassword(){
    this.router.navigate(["/"+this.authService.getUsername()+"/changepassword"])
  }
  logOut(){
    this.username = null;
    this.authService.logout()
  }



}
