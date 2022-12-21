import { Component, OnInit, Output } from '@angular/core';
import {UserService} from '../service/user.service';
import {ConfigService} from '../service/config.service';
import { AuthService, PostService } from '../service';
import { Post } from '../model/post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OuterSubscriber } from 'rxjs/internal-compatibility';
import { User } from '../model/user2.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  posts: Post[]=[];
  user!:User;
  author_name: String;
  communityName: String;
  username: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.user = {
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
    this.username=this.getUsername();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getPosts().subscribe(posts => {
      this.posts = posts
    })
    }); 
  }

  makeRequest() {


  }

  getUser(username: String){
    return this.http.get<any>(`http://localhost:8080/api/user/${username}`).subscribe(
      user=> {this.user = user; }
     
    )
  }

  getPosts() {
    const headers= new HttpHeaders()
    .set('Access-Control-Allow-Origin', 'http://localhost:8080');
    return this.http.get<any>(`http://localhost:8080/api/tweet/username/${this.username}/`,{'headers' : headers});
  }

  getUsername(){
    return this.authService.getUsername();
  }

  hasSignedIn(){
    return this.authService.tokenIsPresent()
  }
  
  

}
