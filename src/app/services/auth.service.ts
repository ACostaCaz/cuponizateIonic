import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BusinessProfile } from '../interfaces/business-profile.interface';
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

  register({ email, password, name, address }: any, data: any) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.profileService.create(user.user.uid,{
        id: user.user.uid,
        name: data.name,
        address: data.address,
        // eslint-disable-next-line max-len
        imageurl: 'https://firebasestorage.googleapis.com/v0/b/cuponizate-33b5a.appspot.com/o/userImages%2Fportrait.png?alt=media&token=8552c1ca-6e09-4458-90fd-75d8118e82ee',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
      });
    });
  }

  logout() {
    return this.auth.signOut();
  }
}
