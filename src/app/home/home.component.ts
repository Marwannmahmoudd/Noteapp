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
  emptyMsg:string = '';
constructor(public dialog: MatDialog ,private router:Router, private note:NoteService,private user:UserService,private spinner: NgxSpinnerService){

}
openDialog() {
  const dialogRef = this.dialog.open(NotedataComponent);

  dialogRef.afterClosed().subscribe(result =>{
     
      if (result === 'done') {
        this.getnotes()
      }
     

    
    
  });
}
ngOnInit(): void {
  this.getnotes()
console.log(this.notes.length)
}
deleteFile(id:any,index:any){
  const form = {
    NoteID:id,
    token: localStorage.getItem('token23')!
    
   }
   this.notes.splice(index,1)
   this.notes = [...this.notes]
  this.note.deletenote(id).subscribe({
    next:res=>{
      //console.log(res);
    },
    error:err=>{
     // console.log(err);
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
  //this.notes = [...this.notes]
  this.spinner.show();
  const data = {
   token: localStorage.getItem('token23'),
   userID:this.user.user.getValue().id
  }
  console.log(data);
  
   this.note.getnote().subscribe({
    
    next:(res)=>{
      console.log(res);
      console.log(this.notes.length)
      if(res.msg  === 'done'){
      
        this.spinner.hide();
this.notes = res.notes
      }
      else{
        this.emptyMsg =  res.msg ;
      }
      
    },
    error:err=>{
      console.log(err);
    }

   })
}
logout(){
  this.router.navigate(['/login'])
  localStorage.removeItem('token23')
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
        'Your Note has been deleted.',
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
