import { Component, OnInit } from '@angular/core';
import { USERService } from '../service/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
}) 
export class HomePage implements OnInit {
  

  public errorMessage: string;

  data={
    
    emailId:'', 
    name:'',
    dob:'',
    gender:'',
   
    password:'',
    mobileNo:'',
   
   }

  constructor( private USERService:USERService,private toastController: ToastController) { }

  ngOnInit() {
  }
 
  doSubmitForm(){
    console.log("Try to submit form");
    console.log("DATA ",this.data);

    if(this.data.emailId=='' || this.data.password=='')
    {
      this.presentToast("Fields can not be empty");
     
    }else{
    this.USERService.userRegistration(this.data).subscribe(
      response=>{
        console.log(response);
        this.presentToast("User Successfully Registered");
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


  
  





 

