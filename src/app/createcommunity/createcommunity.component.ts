import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService, PostService} from '../service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Community } from '../model/community.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
@Component({
  selector: 'app-createcommunity',
  templateUrl: './createcommunity.component.html',
  styleUrls: ['./createcommunity.component.css']
})
export class CreatecommunityComponent implements OnInit {

  form: FormGroup;

  expand = false;
  submitted = false;

  user: string;

  newCommunity!:Community;
  username: string;

  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


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
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.form = this.formBuilder.group({
      name: ['',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(32)])],
      description: ['',Validators.compose([Validators.required, Validators.minLength(0), Validators.maxLength(1000)])],
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
    this.postCom(this.newCommunity).subscribe(data =>{console.log(data);this.router.navigate([this.returnUrl]);})
  }


}
