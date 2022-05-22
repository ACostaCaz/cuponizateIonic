import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { profileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user: any;
  private userUid: string;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  constructor(private profileService: profileService, public auth: AngularFireAuth) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
  getUid() {
    return this.user.uid;
  }
  login({ email, password }: any) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register({ email, password, name, address }: any) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(user => {


      /* this.profileService.create({
        id: this.getUid(),
        name: '',
        address: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
      }); */
    });
  }

  logout() {
    return this.auth.signOut();
  }
}
