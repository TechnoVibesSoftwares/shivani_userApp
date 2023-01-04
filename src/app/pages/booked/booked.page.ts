import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/cart.service';

 
@Component({
  selector: 'app-booked',
  templateUrl: './booked.page.html',
  styleUrls: ['./booked.page.scss'],
})
export class BookedPage implements OnInit {
  UserData: any=[];  
  public grandTotal! : number;
  
  
  public totalItem : number = 0;

  public products : any = [];  
  public productList : any ;

  public cartItemList : any =[]

  constructor(private cartService : CartService) { }

  ngOnInit(): void { 
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      
    });
    {
      this.cartService.getProducts()
      .subscribe(res=>{
        this.totalItem = res.length;
      })
    }

 
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
 
}