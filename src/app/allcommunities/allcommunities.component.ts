import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Community } from '../model/community.model';
import { AuthService } from '../service';
import { CommunityService } from '../service/community.sertice';
import { ConfigService } from '../service/config.service';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-allcommunities',
  templateUrl: './allcommunities.component.html',
  styleUrls: ['./allcommunities.component.css']
})



export class AllcommunitiesComponent implements OnInit {

  @Output()username:String;
  communities: Community[] = [];
  constructor(    private config: ConfigService,
    private userService: UserService,
    private comService: CommunityService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    /*this.route.paramMap.subscribe((params: ParamMap) => {
      this.getCommunities().subscribe(communities => {
      this.communities = communities
      this.username=this.getUsername();
    })
    }); */
  }

  getCommunities() {
    const headers= new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(`http://localhost:8080/api/community/`,{'headers' : headers});
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
    this.username = this.userService.currentUser.username;
    this.router.navigate([`${this.username}/createpost`]);
    console.log(this.username)
    }
  }



}
