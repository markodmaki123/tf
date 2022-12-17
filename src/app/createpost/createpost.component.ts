import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, PostService} from '../service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Community } from '../model/community.model';
import { Post } from '../model/post.model';
import { Observable } from 'rxjs';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  form: FormGroup;
  expand = false;

  newPost!:Post;
  
  submitted = false;

  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  selectedValue: string;
  username: string;


  community: Community[] = [];


  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.newPost = {
      id: 0,
      title : "",
      text : "",
      community_name :"",
      author_name:""
    }
  }

  ngOnInit() {
    this.getCommunity();
    this.username = this.route.snapshot.paramMap.get('username');


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.form = this.formBuilder.group({
      title: [''],
      text: [''],
      author_name: [''],
      community_name: ['']
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getCommunity(): void {
    this.http.get<any>(`http://localhost:8080/api/community/`).subscribe(community=> this.community=community)
  }

  postPost(post: Post):Observable<any>{

    return this.http.post("http://localhost:8080/api/post/", post);
  }

  onSubmit() {



    this.newPost.title = this.form.get('title').value
    this.newPost.text = this.form.get('text').value
    this.newPost.community_name = this.form.get('community_name').value
    this.newPost.author_name = this.username

    console.log(this.newPost.author_name)

    this.postPost(this.newPost).subscribe(data => {console.log(data);
      this.router.navigate([this.returnUrl]);})
    
  }

  


}
