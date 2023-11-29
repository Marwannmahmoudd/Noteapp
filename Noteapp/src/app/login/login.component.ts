import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormGroupDirective, NgForm ,FormControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  
  hide = true;

constructor(private build:FormBuilder,private user:UserService,private toast:ToastrService,private router:Router){}
ooh:boolean = false
registerform:FormGroup  = this.build.group({
  email:new FormControl('',[Validators.required,Validators.email,Validators.pattern(/(com|net)$/)]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)]),
})
ngOnInit(): void {
}

register(form:FormGroup){
  this.ooh = true
  this.user.sentdata(form.value).subscribe({
    next:(res)=>{
      console.log(res);
      
    if(res.message == "success"){
      this.ooh=false
     localStorage.setItem('token23',res.token)
      this.router.navigate(['/home'])
      this.user.userdata()
    }
      
      
    },
    error:(dataa)=>{
      this.ooh=false
      this.toast.error(dataa.error.message)
      console.log(dataa);
    }
  })
 
  
}
}
