import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }
  baseurl:any = 'https://note-sigma-black.vercel.app/api/v1/notes'
  headers:any = {
    'token' : '3b8ny__'+localStorage.getItem('token23')
  }
  addnote(formdata:any):Observable<any>{
    return this.http.post(this.baseurl , formdata , { headers : this.headers})
  }
  Updatenote(formdata:any , id:string):Observable<any>{
    return this.http.put(this.baseurl + '/' + id , formdata , { headers : this.headers})
      }
      getnote():Observable<any>{
        return this.http.get(this.baseurl ,{ headers : this.headers})
          }
          deletenote(id:string):Observable<any>{
            return this.http.delete(this.baseurl + '/' + id , { headers : this.headers})
              }
}
