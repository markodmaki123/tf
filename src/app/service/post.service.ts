import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { Post } from '../model/post.model';
import { LikeNumber } from '../model/like.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts:Post[];
  likes:LikeNumber
  listOfUsers:String[]

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private http: HttpClient
  ) {
  }

  getPosts() {
    this.http.get<any>(this.config.posts_url).subscribe(
      response =>{
        this.posts = response;
        return this.posts;
      }
    );
    
  }

  getList(id : String) : string[] {
    this.http.get<any>(this.config.list_url+id).subscribe(
      response =>{
        this.listOfUsers = response;
        return this.listOfUsers;
      }
    );
    return
  }

  getLikes(id : String) : number{
    this.http.get<any>(this.config.likes_url+id+"/").subscribe(
      response =>{
        this.likes = response;
        return this.likes.numberOfLike;
      }
    );
    return 
  }

}
