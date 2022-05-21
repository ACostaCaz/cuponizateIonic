import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user: any;
  constructor(public auth: AngularFireAuth) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    })
  }
  getUid() {
    return this.user.uid
  }
  login({ email, password }: any) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register({ email, password }: any) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}