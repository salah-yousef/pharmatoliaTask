import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth:AngularFireAuth
  ) { }

  //login function
  login(email:string, password:string) {
    console.log("login");
    
    return new Promise((resolve, reject) =>{
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });

  }

  //check user status
  getAuth() {
    return this.afAuth.authState;
  }

  //logout function
  logout() {
    this.afAuth.auth.signOut();
  }

  //Register User
  register(email:string, password:string, firstname:string, lastname:string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          var user = firebase.auth().currentUser;
          if(user){
            user.updateProfile({
               displayName: firstname+" "+lastname,
               photoURL: "photoURLisHere",
            })
          }
          resolve(userData);
        }, 
        err => reject(err));
    });
  }

  
}
