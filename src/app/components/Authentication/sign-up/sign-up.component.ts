import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { user } from 'src/app/user.model';
import { AuthService } from './../../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(public auth:AuthService){};
  obj:user[]=[];

  newUser(form:NgForm){
    const newUser:user={
      fname: form.value.fname,
      lname: form.value.lname,
      email: form.value.email,
      password: form.value.password,
    }
    this.auth.createuser(newUser);

    form.resetForm();
  }

}
