import { OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(public serv:AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error("Method not implemented.");
    if(this.serv.NewToken != ''){
      return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }


}
