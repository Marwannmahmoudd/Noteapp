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
  baseUrl:string =  'https://note-sigma-black.vercel.app/api/v1/users/'
  constructor(private _userservice:HttpClient, private _router:Router ) { 
    this.userdata()
  }
  getdata(data:object):Observable<any>{
    return this._userservice.post(`${this.baseUrl}signUp`   ,data)
    } 
    sentdata(data:object):Observable<any>{
      return this._userservice.post(`${this.baseUrl}signIn` , data)
     } 
     logout(){
      localStorage.removeItem('token23')
      this.user.next(null)
      this._router.navigate(['/login'])
    }
     userdata():void{
      let data = localStorage.getItem('token23')
      if(data !== null){
        let decode = jwtDecode(data)
        this.user.next(decode)
        this._router.navigate(['/home'])
      }
   
     
     }
}
