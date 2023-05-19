import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { note } from 'src/app/note.model';
import { TODOService } from './../../../todo.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{
  mode = 'create';
mode2 = 'create';
isLoading = false;
 userId:any;
 userYouWantToEdit:note= {
   _id: undefined,
   title: '',
   content: '',
   email: '',
   time: '',
   archive: '0'
 }

  constructor(public serv:TODOService,public route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.mode ='edit'
        this.mode2 = "edit";
        this.userId = paramMap.get('id')
        console.log("yo macha!")
        this.userYouWantToEdit = this.serv.returnUserBeforeUpdate(this.userId)
  }
    })  }
  createNote(form:NgForm){

    if(form.invalid){
      return
    }
    ////////////////////////////////// For date
    const now = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[now.getDay()];

    const dayOfMonth = now.getDate();
    const monthOfYear = now.getMonth() + 1;
    const year = now.getFullYear();

    const formattedDate = `${dayOfMonth}/${monthOfYear}/${year}`;
    console.log(formattedDate); // Output the current time to the console
    /////////////////////////////////////////////////////

    const email = localStorage.getItem('email');
    if(this.mode == 'create'){
      const obj:note= {
        _id: '',
        title: form.value.title,
        content: form.value.content,
        email: email,
        time: formattedDate,
        archive: '0'
      }
      this.serv.addNote(obj)
    }
    else{
      const obj2:note= {
        _id: this.userId,
        title: form.value.title,
        content: form.value.content,
        email: email,
        time: formattedDate,
        archive: '0'
      }
      this.serv.updatePost(obj2);
      this.userId=''
      this.mode='create'
    }

    form.resetForm()

  }
}
