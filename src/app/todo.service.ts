import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { note } from './note.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TODOService {


  // currently on which page???
  private observable =  new Subject<note[]>();
  private observable2 =  new Subject<note[]>();
  Index =+'';
  updatePostObj:note={
    _id: '',
    title: '',
    content: '',
    email: '',
    time: '',
    archive: ''
  }
  constructor(public http:HttpClient, public router:Router,public serv:AuthService) { }

  localCopy:note[]=[];
  archiveNotes:note[]=[]

  addNote(note:note){
    this.http.post<{message:string}>("https://notes-backen.vercel.app/api/newNote",note).subscribe((response)=>{
        console.log(response.message);
        this.getNotes()
    })
    this.getNotes();
  }

  newNoteListner(){
    return this.observable.asObservable();
  }
  newArchiveListner(){
    return this.observable2.asObservable();
  }
  // getNotes(){
  //   this.http.get<{message:String,array:note[]}>('http://localhost:3000/api/getNotes').subscribe(data=>{
  //     // console.log(data.message);
  //     this.localCopy = data.array;
  //     this.observable.next([...this.localCopy]);

  //     // console.log(data.array)
  //   })
  // }
  getNotes(){
    const email = localStorage.getItem('email');
    console.log(email)
    this.http.get<{message:String,array:note[]}>(`https://notes-backen.vercel.app/api/getNotes?email=${email}`).subscribe(data=>{
      // console.log(data.message);
      this.localCopy = data.array;
      this.observable.next([...this.localCopy]);
      // console.log(data.array)
    })
  }
  deleteNote(id:string){
    console.log('user deleted was '+id);
    this.http.delete<{message:string}>('https://notes-backen.vercel.app/api/deleteNote/'+id).subscribe((s)=>{
      console.log(s.message);
      this.getNotes();
      this.getArchiveNotes()
    })
  // const afterDelete = this.localCopy.filter(user=> user._id !=id);
  //   this.localCopy = afterDelete;
  //   // console.log(afterDelete);
  //   this.observable.next([...this.localCopy]);

  }


  returnUserBeforeUpdate(_id:string){
    this.Index = this.localCopy.findIndex(x => x._id== _id);
    this.updatePostObj = this.localCopy[this.Index];
    return this.updatePostObj;
  }
  updatePost(note:note){
    console.log(note._id)
    // console.log(User)
    this.http.put<{message:string}>(`https://notes-backen.vercel.app/api/updateNote/${note._id}`,note)
    .subscribe(response=>{
      console.log(response.message)
      this.getNotes();
      this.getArchiveNotes()
    })
  }

  archivePost(id:any){
    const update = this.localCopy.findIndex(x => x._id== id);
    const archive:note= this.localCopy[update]
    archive.archive = '1'
    console.log(archive)
    this.updatePost(archive)
  }

  unArchivePost(id:any){
    const update = this.archiveNotes.findIndex(x => x._id== id);
    const archive:note= this.archiveNotes[update]
    archive.archive = '0'
    console.log(archive)
    this.updatePost(archive)
  }

  getArchiveNotes(){
    const email = localStorage.getItem('email');
    console.log(email)
    this.http.get<{message:String,array:note[]}>(`https://notes-backen.vercel.app/api/getArchiveNotes?email=${email}`).subscribe(data=>{
      // console.log(data.message);
      this.archiveNotes = data.array;
      this.observable2.next([...this.archiveNotes]);

      // console.log(data.array)
})
  }
}
