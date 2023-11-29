import { Component , Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import jwtDecode from 'jwt-decode';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notedata',
  templateUrl: './notedata.component.html',
  styleUrls: ['./notedata.component.css']
})
export class NotedataComponent implements OnInit{
  
constructor(private build:FormBuilder ,private user:UserService,private toast:ToastrService, private note:NoteService,public dialogRef: MatDialogRef<NotedataComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private spinner: NgxSpinnerService){

}
citizenID!:string
userdata:any
dataform!:FormGroup
ngOnInit(): void {
  this.createform()
  this.citizenID = this.user.user.getValue()._id
  this.userdata = jwtDecode(localStorage.getItem('token23')!)
  console.log(this.userdata);
  console.log(this.data);
  
  
}
createform():void{
  this.dataform= this.build.group({
title:[this.data == null ? '': this.data?.note.title  ,Validators.required],
content:[this.data == null ? '': this.data?.note.content ,Validators.required],
token:localStorage.getItem('token23')
  })
}
senddata():void{
if(this.dataform.valid){


  if(this.data === null){
    this.addnote()
  }else{
    this.updatedata()
  }
}


}
close(){
  this.dialogRef.close()
}
updatedata(){
  const data = {
   // token:localStorage.getItem('token23'),
   ...this.dataform.value,
NoteID:this.data.note._id
  }
  let id = this.data.note._id
this.note.Updatenote(data,id).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.msg === 'done'){
      this.dialogRef.close('update')
    }
  },
  error:err=>{
    console.log(err);
  }
})
}
addnote():void{
 
  const data = {
   ...this.dataform.value,
   citizenID:this.userdata.id
  }
  console.log(data);
  
this.note.addnote(data).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.msg == 'done'){
      this.toast.success('Note added')
      this.dialogRef.close('done')
    }
  },
  error:err=>{
    console.log(err);
  }
})
}
}
