import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of, throwError } from "rxjs";
import { map, switchMap  } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import {Storage} from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {

  //Local URL 
  //url="http://localhost:8080";

  //Prod URL
  // url="http://fransalonapp-env-1.eba-mv3mavpj.ap-northeast-1.elasticbeanstalk.com";
 url="http://fransalonapp-env-1.eba-mv3mavpj.ap-northeast-1.elasticbeanstalk.com"
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  checkUserObs:Observable<any>;

  constructor(
    private storage: Storage,
    private readonly platform:Platform,
    private readonly http:HttpClient
  ) { 
    this.loadUserInfo();
  }

  loadUserInfo() {
    let readyPlatformObs = from(this.platform.ready());
 
    this.checkUserObs = readyPlatformObs.pipe(
      switchMap(() => {
          return from(this.getAccessToke());
      }),
      map((token) => {
        if(!token){
          return null;
        }
          var decodedUser = this.jwtHelper.decodeToken(token);
          this.userInfo.next(decodedUser);
          return true;
      }));
    
  }

  getAccessToke(){
    console.log("token : " , this.storage.get("access_token"));
    return this.storage.get("access_token");
  }
  
  getRefreshToke(){
    return this.storage.get("refresh_token");
   }

   callRefreshToken(payload){
    return this.http.post(`${this.url}/refreshtoken`, payload);
  }
  
  getLogout(){
    console.log("Inside logout");
    this.storage.remove("access_token");
  }

  useLogin(login: any): Observable<boolean> {
    if(login && login.email && login.password){
      var payload={
      username:login.email,
      password:login.password
      };
     return this.http.post(`${this.url}/authenticate`,payload).pipe(
      map((response:any)=>{
        console.log(response);
        this.storage.set('access_token',response.token);
        this.storage.set('refresh_token', response.refresh_token);
        var decodedUser = this.jwtHelper.decodeToken(response.access_token);
        this.userInfo.next(decodedUser);
        console.log(decodedUser);
        return true;
      })
      )
    }
    
    return of(false);
    }

getTodos():Observable<any>{
      return this.http.get(`${this.url}/hello`);
  }

  // putdata(id,data){
  //   return  this.http.put('http://demo7515635.mockable.io/account',id,data)
  //   }

  putdata(){
    return this.http.get('http://demo7515635.mockable.io/account');
  }
}
