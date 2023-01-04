import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { USERService } from 'src/app/service/user.service';
import { ForgotPassWordService } from 'src/app/services/forgot-pass-word.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService:AuthService, private router:Router,private toastController: ToastController,private USERService:USERService,private ForgotPassWordService :ForgotPassWordService ) { }
  UserData:any=[];
 @ViewChild(IonModal)
  modal!: IonModal; 
  loginForm = {
    email:'',
    password:''
  };
  logForm={
    emailId:'',
    password:'',
    confirmpassword:''
  };
  data:any=[];

  ngOnInit() {
  }
 
  login(){
    this.authService.useLogin(this.loginForm)
    .subscribe(value => {
      if(value){
        //alert('login success');
        console.log('login success');
        this.router.navigateByUrl('/dashbord')
      }
      else if((this.loginForm.email=='' || this.loginForm.password=='' ))
      {
        this.presentToast("Fields can not be empty");
      }
    },_error => {
      //alert('login fails')
      this.presentToast("Please Enter Valid Credentials");
    })
 }


 async presentToast(msg) {
  
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000,
   
  }); 

  await toast.present();
}
cancel(){
  this.modal.dismiss(null,'cancel')
}

// forp(){

//   if((this.logForm.email=='' || this.logForm.password=='' ))
//   {
//     this.presentToast("Fields can not be empty");
//   }
  // else if(( this.logForm.password !== this.logForm.confirmpassword)){

  //   this.presentToast("Password Not Match");
   
 
  //   //alert('login success');
    
  // }
//   else{

//     console.log('login success');
//     this.router.navigateByUrl('/dashbord');
// this.cancel();
    
    
//   }
// else{
//   this.ForgotPassWordService .forgotPassword(this.data).subscribe(
//     response=>{
//       console.log(response);
//       this.presentToast("Password Successfully change");
//       this.router.navigateByUrl('/dashbord')
//   },
//     error=>{
      
//       console.log("Error from server : " + error);
//       this.presentToast(error);
//   } 
//   )
// }
// }

forgotPassword(){
  console.log("DATA ",this.data);

  if(this.logForm.emailId=='' || this.logForm.password=='')
  {
    this.presentToast("Fields can not be empty");
   
  }else{
  this.ForgotPassWordService.forgotPassword(this.logForm).subscribe(
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


//routerLink="/home"


}