import { Component } from '@angular/core';
import { note } from 'src/app/note.model';
import { TODOService } from 'src/app/todo.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {
  panelOpenState = false;
  update:note | undefined={
    _id: '',
    title: '',
    content: '',
    email: '',
    time: '',
    archive: ''
  }
  notes:note[]=[]
  constructor(public serv:TODOService){}
  ngOnInit(): void {
    this.serv.getArchiveNotes();
    this.serv.newArchiveListner().subscribe((data:note[])=>{
      this.notes = data;
      console.log(data);
    })
  }

  deleteNote(id:any){
      this.serv.deleteNote(id);
  }
  archiveNote(id:any){
  this.serv.unArchivePost(id);
  }
}
