import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public serv:AuthService){};
  title = 'ChatApp';
  ngOnInit(): void {
    this.serv.autoAuthUser();
  }
}
