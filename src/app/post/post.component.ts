import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  expand = false;
  @Input() club: string;
  @Input() title: string;
  @Input() author: string;
  @Input() imgUrl: string;
  @Input() content: string;
  @Input() apiText: string;
  @Input() responseObj: any;
 
  @Output() apiClick: EventEmitter<any> = new EventEmitter();

  username: String;
  constructor(private authService:AuthService, private userService: UserService,public router: Router) { }

  ngOnInit() {
  }

  onButtonClick() {
    this.expand = true;
    this.apiClick.next(this.apiText);
    
  }

  toggleExpand() {
    this.expand = !this.expand;
  }

  responsePanelClass() {
    let classes = ['response'];

    if (this.expand) {
      classes.push('expand');
    }

    if (this.responseObj.status) {
      this.responseObj.status === 200 ?
      classes.push('response-success') :
      classes.push('response-error');
    }
    return classes.join(' ');
  }

  getUsername(){
    return this.authService.getUsername();
  }

  hasSignedIn(){
    return this.authService.tokenIsPresent()
  }
  

  userName() {

    console.log(this.username)
    if(!this.hasSignedIn())this.router.navigate([`/login`]);
    else{
    this.username=this.getUsername();
    this.router.navigate([`${this.username}/createpost`]);
    console.log(this.username)
    }
  }

}
