import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from './components/Authentication/sign-up/sign-up.component';
import { LogInComponent } from './components/Authentication/log-in/log-in.component';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { HomePageComponent } from './components/Home/home-page/home-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { NotesComponent } from './components/Home/notes/notes.component';
import { ArchiveComponent } from './components/Home/archive/archive.component';
import { BinComponent } from './components/Home/bin/bin.component';
import { ShowNotesComponent } from './components/Home/show-notes/show-notes.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { TODOListComponent } from './components/todolist/todolist.component';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    HomePageComponent,
    NotesComponent,
    ArchiveComponent,
    BinComponent,
    ShowNotesComponent,
    TODOListComponent,

  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    MatInputModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
