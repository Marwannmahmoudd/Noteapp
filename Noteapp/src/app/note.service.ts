import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }
  baseurl:any = 'https://sticky-note-fe.vercel.app/'
  addnote(formdata:any):Observable<any>{
return this.http.post(this.baseurl + 'addNote' , formdata)
  }
  Updatenote(formdata:any):Observable<any>{
    return this.http.put(this.baseurl + 'updateNote' , formdata)
      }
      getnote(formdata:any):Observable<any>{
        return this.http.post(this.baseurl + 'getUserNotes' , formdata)
          }
          deletenote(formdata:any):Observable<any>{
            const modal ={
              body:formdata
            }
            return this.http.delete(this.baseurl + 'deleteNote' , modal)
              }
}
