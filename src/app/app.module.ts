import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from "./shared/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ManufacturersComponent } from './components/manufacturers/manufacturers.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { AuthService } from "./services/auth.service";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const firebaseConfig = {
  apiKey: "AIzaSyC7g0atCy_BWVqUwmci14F4mKcOwXrs9Jg",
  authDomain: "pharmatoliatask.firebaseapp.com",
  databaseURL: "https://pharmatoliatask.firebaseio.com",
  projectId: "pharmatoliatask",
  storageBucket: "",
  messagingSenderId: "905978291526"
};

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'details/:brand', component: ManufacturersComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: ''}

    //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    ManufacturersComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgScrollbarModule
  ],
  providers: [
    DataService,
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
