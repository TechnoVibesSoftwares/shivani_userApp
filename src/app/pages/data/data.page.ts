import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/cart.service';
@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
}) 
export class DataPage implements OnInit {  
UserData:any=[];
grandTotal : number=0;
public totalItem : number = 0;
public productList : any ;
public products : any = []; 
public searchTerm !: string;
searchKey:string ="";
public filterCategory : any


  constructor(private http:HttpClient,private cartService : CartService) { }
 
  ngOnInit() {
    this.http.get(' http://demo7515635.mockable.io/hello',).subscribe(Data=>{
    console.log(Data);
    this.UserData=Data;
    this.UserData.forEach((a:any) => {
    
      Object.assign(a,{total:a.rate});
    });
  this.cartService.search.subscribe((val:any)=>{
    this.searchKey = val; 
  })
  }); 
  {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  } 
  } 
 
  addtocart(item: any){
    this.cartService.addtoCart(item); 
  }
  search(event){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
  

}