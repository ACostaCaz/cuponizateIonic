import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Coupon } from '../interfaces/coupon.interface';
import * as uuid from 'uuid';
@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  coupons!: Coupon;
  code!: string;
  constructor(private route: ActivatedRoute,private readonly afs: AngularFirestore) {

   }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.coupon(id).then(coupon => {
      this.coupons = coupon[0];
    });
    console.log(id);
  }

  coupon(id: string) {
    return new Promise<any>((resolve) => {
     this.afs.collection('coupons', ref => ref.where('id', '==', id))
     .valueChanges()
     .subscribe(coupon => resolve(coupon));
    });
   }

  getCode() {
    this.code = uuid.v4();
  }
}
