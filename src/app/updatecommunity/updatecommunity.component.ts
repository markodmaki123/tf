import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService, PostService} from '../service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Community } from '../model/community.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from '../model/post.model';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
@Component({
  selector: 'app-updatecommunity',
  templateUrl: './updatecommunity.component.html',
  styleUrls: ['./updatecommunity.component.css']
})
export class UpdatecommunityComponent implements OnInit {

  form: FormGroup;

  expand = false;
  submitted = false;

  user: string;

  newCommunity!:Community;
  username: string;

  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  oldname: string;
  description: string
  posts: Post[]=[];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _Activatedroute:ActivatedRoute
  ) {
this.newCommunity = {
  name: "",
  description: "",
  moderatorUsername: ""
}
  }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let name = params.get(`name`) || ""
      let username = params.get(`username`) || ""
      this.getCommunity(name).subscribe(newCommunity => {
      this.newCommunity = newCommunity
      this.description = newCommunity.description
      console.log(newCommunity)
    }
      )
    }); 
    

    this.username = this.route.snapshot.paramMap.get('username');
    this.oldname = this.route.snapshot.paramMap.get('name');
    

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.form = this.formBuilder.group({
      name: [''],
      description: [''],
      moderatorUsername: ['']
    });
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  postCom(com: Community):Observable<any>{
    return this.http.post("http://localhost:8080/api/community/", com);
  }

  onSubmit() {

    this.notification = undefined;
    this.submitted = true;

    this.newCommunity.name =this.form.get('name').value
    this.newCommunity.description =this.form.get('description').value
    this.newCommunity.moderatorUsername = this.username
    console.log(this.username);
    console.log(this.oldname);
    console.log(this.newCommunity);
    
    this.putCom(this.newCommunity,this.oldname).subscribe(data =>{console.log(data);this.router.navigate([`/community/${this.newCommunity.name}`]);})
  }

  getCommunity(name:string): Observable<Community> {

    return this.http.get<Community>(`http://localhost:8080/api/community/${name}/`);
    
  }

  putCom(com:Community, name: string) {

    return this.http.put<Community>(`http://localhost:8080/api/community/${name}/`,com);
    
  }

  deletePost(name: string){
    for(var post of this.posts){
      if(name === post.title){
        return this.http.delete<any>(`http://localhost:8080/posts/${name}/`);
      }
    }
  }

  getPosts(name: string) {
    const headers= new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(`http://localhost:8080/posts/${name}/`,{'headers' : headers});
  }

}