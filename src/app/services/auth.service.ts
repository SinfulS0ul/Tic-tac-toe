import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, public snackBar: MatSnackBar) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.snackBar.open('Registration was successful', '^~^', {
          duration: 4000,
        });
      })
      .catch(() => {
        this.snackBar.open('Incorrect data', ':c', {
          duration: 4000,
        });
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.snackBar.open('Welcome back, friend', '^~^', {
          duration: 4000,
        });
      })
      .catch(() => {
        this.snackBar.open('Try another data', ':)', {
          duration: 4000,
        });
      });
  }

  googleLogin() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    this.snackBar.open('We will waiting for you', '<3', {
      duration: 4000,
    });
  }
}
