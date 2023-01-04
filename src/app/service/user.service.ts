import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class USERService {
  // url="http://fransalonapp-env-1.eba-mv3mavpj.ap-northeast-1.elasticbeanstalk.com";
     url="http://fransalonapp-env-1.eba-mv3mavpj.ap-northeast-1.elasticbeanstalk.com";
public account:any
  constructor(private http:HttpClient) { }

  userRegistration(item:any){
    // return this.http.post(`${this.url}/getCustomerDetails`,item)
     return this.http.post(`${this.url}/registerCustomer`,item)

  } 

  getData(item:any){
     return this.http.post(`${this.url}/getCustomerDetails`,item)

  } 

 
}
 