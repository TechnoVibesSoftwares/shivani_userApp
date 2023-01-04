import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  public totalItem : number = 0;
  todos :any;

  constructor(private cartService : CartService,private authService:AuthService) { }

  ngOnInit() {
    {
      this.cartService.getProducts()
      .subscribe(res=>{
        this.totalItem = res.length;
      })
    }
  }
  afterLoggedIn(){
    this.authService.getTodos().subscribe(
      (data) => {
        console.log("Milgya Bhai : ",data)
        this.todos = data.name;
      },
      (error) => {
        alert('failed fetch todos')
      }
    )
  } 

}
