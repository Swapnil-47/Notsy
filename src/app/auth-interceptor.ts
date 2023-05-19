import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

  constructor (public Auth:AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Adding token to every single request.
    console.log(req);
    const authToken = this.Auth.NewToken
    const authRequest = req.clone({
      headers:req.headers.set('Authorization',"Bearer "+authToken)
    });
    return next.handle(authRequest);
}

}
