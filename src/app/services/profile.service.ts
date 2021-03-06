import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BusinessProfile } from '../interfaces/business-profile.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
// eslint-disable-next-line @typescript-eslint/naming-convention
export class profileService {
  private profileCollection: AngularFirestoreCollection<BusinessProfile>;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  profile: Observable<BusinessProfile[]>;
  constructor(private afs: AngularFirestore) {
    this.profileCollection = afs.collection<BusinessProfile>('profiles');
    this.profile = this.profileCollection.valueChanges();
  }
  create(id: string, profile: BusinessProfile) {
    this.profileCollection.doc(id).set(profile);
  }
  update(id: string, profile: BusinessProfile){
    return this.profileCollection.doc(id).update(profile);
  }
  delete(id: string) {
    return this.profileCollection.doc(id).delete();
  }
}
