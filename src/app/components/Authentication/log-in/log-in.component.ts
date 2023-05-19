import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor(public serv:AuthService){}

  checkUser(form:NgForm){
    const obj ={
      email:form.value.email,
      password:form.value.password
    }
    this.serv.checkUser(obj)

    form.resetForm();
  }
}
