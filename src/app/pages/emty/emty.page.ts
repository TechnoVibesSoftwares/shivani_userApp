import { Component, OnInit,NgZone } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { USERService } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-emty',
  templateUrl: './emty.page.html',
  styleUrls: ['./emty.page.scss'],
})
export class EmtyPage implements OnInit {
UserData:any=[];
todos :any;
data={
    
  emailId:'', 
 mobileNo:''
 
 }
 item:any;

  constructor(private cartService:CartService, private authService:AuthService, private USERService:USERService,private toastController: ToastController) {
    
   }


  async ngOnInit() {
   this.doSubmitForm
   console.log(this.item)
  }

  getProduct(){
    this.cartService.getProducts().subscribe(Data=>{
      console.log(Data);
      this.UserData=Data;
     
  
      });
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

 doSubmitForm(){
  console.log("Try to submit form");
  console.log("DATA ",this.data);
  console.log(this.item)

  if(this.data.emailId=='')
  {
    this.presentToast("Fields can not be empty");
   
  }else{
  this.USERService.getData(this.data).subscribe(
    response=>{
      console.log(response);
      this.presentToast("User Successfully Registered");
      this.item= response
  },
    error=>{
      
      console.log("Error from server : " + error);
      this.presentToast(error);
  } 
    )
} 
}

async presentToast(msg) {
   const toast = await this.toastController.create({
    message: msg,
    duration: 2000,
   });
  await toast.present();
}


}