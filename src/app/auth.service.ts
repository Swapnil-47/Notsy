import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { user } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public http:HttpClient, public router:Router) { }
  private observable =  new Subject();
  private authStatus = new Subject();
  private tokenTimer:any; // if doesn't work then 'any'

  authStatusListner(){
    return this.authStatus.asObservable()
  }
  NewToken = ''
  currentUser:string|null = '';
  email:string=''
  expirationDuration=0;
  createuser(newUser:user){
    console.log(newUser)
    this.http.post<{message:string}>("https://notes-backen.vercel.app/api/newUser",newUser).subscribe((response)=>{
        console.log(response.message);
    })
  }


  checkUser(obj:any){
    console.log(obj);
    this.http.post<{message:string,token:string,name:string,Auth:string,expiresIn:number,email:string}>("https://notes-backen.vercel.app/api/checkUser",obj).subscribe((response)=>{
      console.log(response.token)
        this.NewToken = response.token;
        // console.log(this.currentUser);
        this.expirationDuration = response.expiresIn;
        this.setAuthTimer(response.expiresIn);
        if(response.Auth){
          this.router.navigate(['/Home']);
          this.authStatus.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + response.expiresIn*1000);
          this.email = response.email
          this.saveAuthData(expirationDate,response.name);
        }
        // this.currentUser = response.name;
    })
  }
  autoAuthUser(){
    //will be called from app.component.ts
    const authInformation = this.getAuthData();
    if(authInformation.token==''){
      return
    }
    const now = new Date();
    const expiresIn =  authInformation.expirationDate.getTime()-now.getTime();
    if (expiresIn>0){
        this.router.navigate(['/Home']);
        this.NewToken = authInformation.token;
        this.setAuthTimer(expiresIn/1000)
        this.authStatus.next(true);
        this.currentUser = authInformation.name;
    }
  }
  public logout(){
    this.router.navigate(['/']);
    this.authStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }
  private saveAuthData(expirationDate:Date,name:any){
    localStorage.setItem('token',this.NewToken);
    localStorage.setItem('email',this.email);
    localStorage.setItem('expiration',expirationDate.toISOString())
    localStorage.setItem('name',name);
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('name');
    localStorage.removeItem('email');

  }
  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const name = localStorage.getItem('name');
    console.log(name);
    if(!token || !expirationDate){
      return {
        token:'',
        expirationDate:new Date(),
        name:''
      }
    }
    return{
      token:token,
      expirationDate:new Date(expirationDate),
      name:name
    }
  }

  private setAuthTimer(duration:number){
    console.log("setting timer:"+duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
  }, duration*1000);
  }
}
