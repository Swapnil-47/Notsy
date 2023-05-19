import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { note } from 'src/app/note.model';
import { TODOService } from './../../../todo.service';

@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.css']
})
export class ShowNotesComponent implements OnInit{
  update:note | undefined={
    _id: '',
    title: '',
    content: '',
    email: '',
    time: '',
    archive: ''
  }
  notes:note[]=[]
  panelOpenState = false;
  constructor(public serv:TODOService){}
  ngOnInit(): void {
    this.serv.getNotes();
    this.serv.newNoteListner().subscribe((data:note[])=>{
      this.notes = data;
      console.log(data);
    })
  }

  deleteNote(id:any){
      this.serv.deleteNote(id);
  }
  archiveNote(id:any){
  this.serv.archivePost(id);
  }
}
