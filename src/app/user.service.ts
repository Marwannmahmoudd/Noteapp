import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable ,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:BehaviorSubject<any>=new BehaviorSubject(null)
  baseurl:string = "https://sticky-note-fe.vercel.app/"
  constructor(private _userservice:HttpClient, private _router:Router) { 
    this.userdata()
  }
  getdata(data:object):Observable<any>{
    return this._userservice.post(this.baseurl + "signup" , data)
    } 
    sentdata(data:object):Observable<any>{
     return this._userservice.post(this.baseurl + "signin" , data)
     } 
     userdata():void{
      let data = localStorage.getItem('token')
      if(data !== null){
        let decode = jwtDecode(data)
        this.user.next(decode)
        this._router.navigate(['/home'])
      }
     
     }
}
