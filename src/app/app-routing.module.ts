import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/Authentication/log-in/log-in.component';
import { SignUpComponent } from './components/Authentication/sign-up/sign-up.component';

import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './components/Home/home-page/home-page.component';

const routes: Routes = [
  {path:'SignUp',component:SignUpComponent},
  {path:'',component:LogInComponent},
  {path:'Home', component:HomePageComponent,canActivate:[AuthGuard]},
  {path:'edit/:id',component: HomePageComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
