import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { USERService } from 'src/app/service/user.service';
import { HttpClient } from '@angular/common/http';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  [x: string]: any;
  photo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJeFAKfReAoGRDn2qm4ydK3m5yuYxrcnl2m7PcxGODnVPqc14bTwO6q2jPEY6TaLkcIv0&usqp=CAU';
  public totalItem : number = 0;
  items: any=[];
  isModalOpen = false;
  edit:any=new FormGroup({
    email:new FormControl(''), 
    name:new FormControl(''),
    dob:new FormControl(''),
    gender:new FormControl(''),
    mobile:new FormControl(''),
   
  })
 add:any=[];
  url :any="http://demo0884554.mockable.io/account";
  constructor(private http: HttpClient, private Router:ActivatedRoute, private authService:AuthService, private storage: Storage,private router:Router,private cartService : CartService, private userService:USERService
    ) { }

  ngOnInit(){

    
    this.http.get('http://demo0884554.mockable.io/account',).subscribe(res=>{
      
      this.items=res; 
      this.edit=this.items

    
    console.log(this.edit)
    this.edit.controls['email'].setValue(this.items.email);
this.edit.controls['name'].setValue(this.items.name);
this.edit.controls['dob'].setValue(this.items.dob);
this.edit.controls['gender'].setValue(this.items.gender);
this.edit.controls['mobile'].setValue(this.items.mobile);

this.edit=new FormGroup({
  email:new FormControl(res['email']), 
  name:new FormControl(res['name']),
  dob:new FormControl(res['dob']),
  gender:new FormControl(res['gender']),
  mobile:new FormControl(res['mobile']),
 
})


  });
  

this.edit.reset();
    {
      this.cartService.getProducts()
      .subscribe(res=>{
        this.totalItem = res.length;
      }) 
    }
  } 

  logout(){
    this.authService.getLogout();
    this.storage.remove("access_token");
    this.router.navigateByUrl('/login')


  }
  closeModal() {
    this.modal.dismiss(null, 'backdrop');
  }
  startCapture(type) {
    this.modal.dismiss(type, 'select');
  }
  cancel(){
    this.modal.dismiss(null,'cancel')
 
  }
  
  


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') { 
      this.massege = `, ${ev.detail.data}!`;

  }
}
  setOpen(isOpen: boolean,id:string) {
    this.isModalOpen = isOpen;
 let data =this.items.find((p)=>{return p.id===id})
this. edit=({
  email:data.email, 
  name:data.name,
  dob:data.dob,
  gender:data.gender,
  mobile:data.mobile 
 
})

  }
  update(){
 
   this.authService.putdata()
   .subscribe({
    next:(res)=>{
      this.edit=res
      alert ("update successfully")
   

    }
   }) 
  console.log(this.edit)
return this.cancel();
 }


}

