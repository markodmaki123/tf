import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reaction } from '../model/reaction.model';
import { ReactionType } from '../model/reactiontype.model';
import { User } from '../model/user2.model';
import { AuthService } from '../service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  expand = false;

  @Input() postId: number;

  @Input() club: string;
  @Input() title: string;

  @Input() author: string;

  @Input() content: string;

  @Input() apiText: string;
  @Input() responseObj: any;
  
  @Output() pid: number;

  upvoted: boolean = false;
  downvoted: boolean = false;


  returnUrl: string;
  status: string;
  errorMessage:string
  @Output() apiClick: EventEmitter<any> = new EventEmitter();


  newReaction!:Reaction;
  user!:User;
  user1!:User;
  username:String;
  displayName: String;

  constructor(    
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
   ) { 
    this.newReaction = {
      post_id: 0,
      voter_id: 0,
      type: null
    }
    this.user = {
      username: '',
      password: '',
      name: '',
      surname: '',
      age: 0,
      gender: '',
      residance: ''
    }
    this.user1 = {
      username: '',
      password: '',
      name: '',
      surname: '',
      age: 0,
      gender: '',
      residance: ''
    }
   }

  ngOnInit() {
    this.pid = this.postId
    this.returnUrl = this.route.snapshot.paramMap.get('name');

    this.username = this.authService.getUsername()
    this.displayName = this.username
    this.getUser(this.author)
    this.getUser1(this.username) 
    
  }

  getUser(username: String){
    return this.http.get<any>(`http://localhost:8080/api/user/username/${username}/`).subscribe(
      user=> {this.user = user;}
     
    )
  }
  getUser1(username: String){
    return this.http.get<any>(`http://localhost:8080/api/user/username/${username}/`).subscribe(
      user=> {this.user1 = user; }
     
    )
  }
  upvote(){

    if(this.authService.tokenIsPresent())
    {

    this.newReaction.post_id = this.pid;
    //this.newReaction.voter_id = this.user1.id;
    this.newReaction.type = ReactionType.LIKE
    
    this.postVote(this.newReaction).subscribe(data=> {console.log(data)
    
    })
    
    }
    else{
      this.router.navigateByUrl('/login');
    }

  }
  downvote(){
    if(this.authService.tokenIsPresent())
    {
    this.newReaction.post_id = this.pid;
    //this.newReaction.voter_id = this.user1.id;
    this.newReaction.type = ReactionType.DISLIKE
    
    this.postVote(this.newReaction).subscribe(data=> {console.log(data)
      })
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  postVote(reaction: Reaction):Observable<any>{
    return this.http.post("http://localhost:8080/api/reaction/", reaction);
  }



  onButtonClick() {
    this.expand = true;
    this.apiClick.next(this.apiText);
    this.deletePost()
  }

  onButtonClick1() {
    if(this.username==this.author){
    
      this.deletePost().subscribe({
      next: data => {
          this.status = 'Delete successful';
          this.refresh()
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }});
    }
    else{
      alert("You are not the author of the post")
    }
  }

  deletePost(){
       
        console.log(this.title)

        return this.http.delete<any>(`http://localhost:8080/api/post/${this.title}/`);  
  }
  
  refresh(): void {
        window.location.reload();
    }
    



  toggleExpand() {
    this.expand = !this.expand;
  }

  responsePanelClass() {
    let classes = ['response'];

    if (this.expand) {
      classes.push('expand');
    }


    return classes.join(' ');
  }

}
