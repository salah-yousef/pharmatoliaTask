import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  showSpinner: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
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
    this.authService.register(this.email, this.password, this.firstname, this.lastname)
      .then(res => {
        this.snackBar.open('Welcome ' + this.firstname, '', { duration: 3000 });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.snackBar.open(err.message, '', { duration: 3000 });
        this.router.navigate(['/login']);
      })
  }
}
