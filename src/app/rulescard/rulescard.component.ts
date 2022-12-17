import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service';

@Component({
  selector: 'app-rulescard',
  templateUrl: './rulescard.component.html',
  styleUrls: ['./rulescard.component.css']
})
export class RulescardComponent implements OnInit {

  expand = false;
  @Input() club: string;
  @Input() rules: string;
  @Input() description: string;
  @Input() moderator: string;
  username: string
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.username =  this.authService.getUsername()
  }


  hasSignedIn(){
    return this.authService.tokenIsPresent()
  }

  checkUsername(){
    console.log(this.moderator+"  "+ this.authService.getUsername() )
    if(this.moderator == this.authService.getUsername() )
      return true
    else return false
  }

}
