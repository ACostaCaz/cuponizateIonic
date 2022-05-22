import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { businessProfile } from '../interfaces/business-profile.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
// eslint-disable-next-line @typescript-eslint/naming-convention
export class profileService {
  private profileCollection: AngularFirestoreCollection<businessProfile>;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  profile: Observable<businessProfile[]>;
  constructor(private afs: AngularFirestore) {
    this.profileCollection = afs.collection<businessProfile>('profiles');
    this.profile = this.profileCollection.valueChanges();
  }
  create(profile: businessProfile) {
    this.profileCollection.add(profile);
  }
  update(id: string, data: any){
    return this.profileCollection.doc(id).update(data);
  }
  delete(id: string) {
    return this.profileCollection.doc(id).delete();
  }
}
