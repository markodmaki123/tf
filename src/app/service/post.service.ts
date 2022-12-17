import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { Post } from '../model/post.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts:Post[];

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

}
