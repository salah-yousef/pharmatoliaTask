import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  showSpinner: boolean = false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar
    ) { 

    }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
    .then(res => {
      var user = firebase.auth().currentUser;
      this.snackBar.open('Welcome '+ user.displayName, '',{duration: 3000});
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.snackBar.open(err.message,'',{duration: 3000});
      this.router.navigate(['/login']);
    })
  }

}
