import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Coupon } from '../interfaces/coupon.interface';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';
@Component({
  selector: 'app-business-coupons',
  templateUrl: './business-coupons.component.html',
  styleUrls: ['./business-coupons.component.scss']
})
export class BusinessCouponsComponent implements OnInit {
  coupons!: Coupon[];
  userId!: string;
  constructor(private readonly afs: AngularFirestore, private authService: AuthService, private auth: AngularFireAuth) {}
  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        this.businessCoupons().then(coupon => {
          console.log(coupon);
          this.coupons = coupon;
        });
      } else {
        this.userId = null;
      }
    });

  }

  businessCoupons() {
   return new Promise<any>((resolve) => {
     console.log(this.userId);
      this.afs.collection('coupons', ref => ref.where('userId', '==', this.userId))
      .valueChanges()
      .subscribe(coupon => resolve(coupon));
   });
  }
}
