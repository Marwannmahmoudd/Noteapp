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
userdata:any
dataform!:FormGroup
ngOnInit(): void {
  this.createform()
  this.userdata = jwtDecode(localStorage.getItem('token')!)
  console.log(this.userdata);
  console.log(this.data);
  
  
}
createform():void{
  this.dataform= this.build.group({
title:[this.data? this.data.note.title : '',Validators.required],
desc:[this.data? this.data.note.desc : '',Validators.required],
token:localStorage.getItem('token')
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
  const modal = {
    token:localStorage.getItem('token'),
   ...this.dataform.value,
NoteID:this.data.note._id
  }
this.note.Updatenote(modal).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.message === 'updated'){
      this.dialogRef.close('update')
    }
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
    if(res.message == 'success'){
      this.toast.success('Note added')
      this.dialogRef.close('app')
    }
  }
})
}
}
