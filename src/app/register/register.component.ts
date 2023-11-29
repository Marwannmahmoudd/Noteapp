import { group } from '@angular/animations';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  
  hide = true;

constructor(private build:FormBuilder,private user:UserService,private toast:ToastrService,private router:Router){}
ooh:boolean = false
registerform:FormGroup  = this.build.group({
  name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(14)]),
 
  email:new FormControl('',[Validators.required,Validators.email,Validators.pattern(/(com|net)$/)]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]),
  age:new FormControl('',[Validators.required]),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
 })
ngOnInit(): void {
  this.createform()
}
createform():void{

}
register(form:FormGroup){
  this.ooh = true
  this.user.getdata(form.value).subscribe({
    next:(res)=>{
      console.log(res);
    if(res.msg == "done"){
      this.ooh=false
      console.log("ghf");
      this.router.navigate(['/login'])
    }
      
      
    },
    error:(dataa)=>{
      this.ooh=false
      this.toast.error(dataa.error.msg)
      console.log(dataa);
    }
  })
 
  
}
}
