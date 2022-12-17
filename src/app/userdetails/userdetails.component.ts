import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService, PostService} from '../service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Community } from '../model/community.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/user3.model';
interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})


export class UserdetailsComponent implements OnInit {
  submitted = false;
  notification: DisplayMessage;
  form: FormGroup;
  newUser!:User;
  username: string;
  returnUrl: string;
  userKarma: number
  id: number
  constructor(    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _Activatedroute:ActivatedRoute) { 
      this.newUser = {
        id: 0,
        password: "",
        username: "",
        display_name:"",
        description: ""
      }
    }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get(`username`) || ""
      this.getUser(this.username).subscribe(newUser => {
      this.newUser = newUser
      this.getKarma(newUser.id).subscribe(
        karma=> { this.userKarma = karma; console.log("ovo je karma korisnika" + karma)}
     );
    })
    }); 
    this.username = this.route.snapshot.paramMap.get('username');



    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.form = this.formBuilder.group({
      displayName: [''],
      description: ['']
    });
  }


  putUser(user:User, username: string) {

    return this.http.put<User>(`http://localhost:8080/api/user/${username}/`,user);
    
  }

  getKarma(voterId: number){
    return this.http.get<number>(`http://localhost:8080/api/reaction/voter/${voterId}/`)
    
  }

  getUser(username: string){
    return this.http.get<User>(`http://localhost:8080/api/user/username/${username}/`);
  }

}
