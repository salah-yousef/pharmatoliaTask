import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser:string = '';
  constructor(
    private authService: AuthService,
    private router:Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.snackBar.open('You are logged out','',{duration: 3000});
    this.router.navigate(['/login/']);
  }

}
