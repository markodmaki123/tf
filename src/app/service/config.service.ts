import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api_url = 'http://localhost:8080/api';

  private _user_url = this._api_url + '/user/';

  private _login_url = this._user_url + 'login/';

  private _posts_url = this._api_url + '/posts/';

  private _community_url = this._api_url + '/community/'



  get community_url(): string {
    return this._community_url;
  }

  get posts_url(): string {
    return this._posts_url;
  }

  get login_url(): string {
    return this._login_url;
  }


  private _users_url = this._user_url + 'user/';

  get users_url(): string {
    return this._users_url;
  }
  
  private _signup_url = this._user_url + 'register/';

  get signup_url(): string {
    return this._signup_url;
  }

}
