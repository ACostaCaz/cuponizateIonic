import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {Coupon} from '../interfaces/coupon.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private couponsCollection: AngularFirestoreCollection<Coupon>;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  coupons: Observable<Coupon[]>;
  constructor(private afs: AngularFirestore) {
    this.couponsCollection = afs.collection<Coupon>('coupons');
    this.coupons = this.couponsCollection.valueChanges();
  }
  getAll(){
    return this.coupons;
  }
  create(coupon: Coupon) {
    this.couponsCollection.add(coupon);
  }
  update(id: string, data: any){
    return this.couponsCollection.doc(id).update(data);
  }
  delete(id: string) {
    return this.couponsCollection.doc(id).delete();
  }
}
