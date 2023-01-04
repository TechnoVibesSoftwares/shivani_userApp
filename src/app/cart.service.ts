import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

 
@Injectable({
  providedIn: 'root' 
})
export class CartService {
  public products : any; 
  public cartItemList : any =[]
  UserData:any=[];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
total:number;

  constructor( private http:HttpClient) { }
  getProducts(){
    // return this.UserData.asObservable();
    this.http.get(' http://demo7515635.mockable.io/hello',).subscribe(Data=>{
    console.log(Data);
    this.UserData=Data;
  });
  return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal=0;
    this.cartItemList.map((a:any)=>{
    grandTotal +=  a.total   ;
    
    })
    console.log(grandTotal)
    return grandTotal;
   
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

}
