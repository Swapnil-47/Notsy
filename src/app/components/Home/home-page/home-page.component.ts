import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../../auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  constructor(public serv:AuthService,public dialog: MatDialog){}
  isSmallScreen = window.innerWidth < 600;
  ngOnInit(): void {
    const isSmallScreen = window.innerWidth < 600;
    if(isSmallScreen){
      this.opened = false
    }
  }
  opened = true;
  flag="TODO"

  status(status:string){
    this.flag = status
  }
  logOut(){
    this.serv.logout();
  }
  isSmallScreenMethod(){
    if(this.isSmallScreen){
      this.opened = false
    }
  }
  animal: string='';
  name: string='';

}


