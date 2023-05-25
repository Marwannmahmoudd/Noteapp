import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NotedataComponent } from '../notedata/notedata.component';
import { NoteService } from '../note.service';
import { UserService } from '../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  value = '';
  notes:any[]=[]
constructor(public dialog: MatDialog ,private router:Router, private note:NoteService,private user:UserService,private spinner: NgxSpinnerService){

}
openDialog() {
  const dialogRef = this.dialog.open(NotedataComponent);

  dialogRef.afterClosed().subscribe({
    next:(res)=>{
     if(res === 'app'){
      this.getnotes()
     }
    
      
    }
  })
}
ngOnInit(): void {
  this.getnotes()
}
deleteFile(id:any,index:any){
  const form = {
    NoteID:id,
    token: localStorage.getItem('token'),
    
   }
  this.note.deletenote(form).subscribe({
    next:(res)=>{
     if(res.message === 'deleted'){
      this.notes.splice(index,1)
      this.notes = [...this.notes]
     }
      
    }
  })
  
}
updatenotes(note:any){
 const update = this.dialog.open(NotedataComponent,{
    data:{note}
  });
  update.afterClosed().subscribe({
    next:(res)=>{
      if(res === 'update'){
        this.getnotes()
      }
    }
    })
}
getnotes(){
  this.spinner.show();
  const form = {
   token: localStorage.getItem('token'),
   userID:this.user.user.getValue().id
  }
  console.log(form);
  
   this.note.getnote(form).subscribe({
    next:(res)=>{
      if(res.message === "success"){
        this.spinner.hide();
this.notes = res.Notes
      }
      
    }

   })
}
logout(){
  this.router.navigate(['/login'])
  localStorage.removeItem('token')
}
swal(id:any,index:any){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success m-2',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteFile(id,index)
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        ' :)',
        'error'
      )
    }
  })
}
}
