import { Component, Input, OnInit, Output } from '@angular/core';
import {UserService} from '../service/user.service';
import {ConfigService} from '../service/config.service';
import { PostService } from '../service';
import { Post } from '../model/post.model';
import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders  } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Community } from '../model/community.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  
  url1:string;
  url2:string;
  
  posts: Post[]=[];
  community: Community;
  authorName: String;
  communityName: String;
  description: String;
  owner: string;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit() {
   
    this.route.paramMap.subscribe((params: ParamMap) => {
      let name = params.get(`name`) || ""
      this.getCommunity(name).subscribe(community => {

      this.community = community
      this.description = community.description
      this.communityName = community.name
      this.owner = community.moderatorUsername;

      console.log("owner :" +community.moderatorUsername)
    })
    }); 
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      let name = params.get(`name`) || ""
      this.getPosts(name).subscribe(posts => {
      this.posts = posts})
    }); 
  }
  makeRequest() {
  }

  getPosts(name: string) {
    const headers= new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(`http://localhost:8080/api/post/${name}/`,{'headers' : headers});
  }

  
  getCommunity(name:string): Observable<Community> {

    return this.http.get<Community>(`http://localhost:8080/api/community/${name}/`);
    
  }


  

  


}
