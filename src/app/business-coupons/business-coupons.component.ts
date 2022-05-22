import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Coupon } from '../interfaces/coupon.interface';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-business-coupons',
  templateUrl: './business-coupons.component.html',
  styleUrls: ['./business-coupons.component.scss']
})
export class BusinessCouponsComponent implements OnInit {
  coupons!: Coupon[];
  constructor(private readonly afs: AngularFirestore, private authService: AuthService) {
    this.businessCoupons().then(coupon => {
      console.log(coupon);
      this.coupons = coupon;
    });
  }
  ngOnInit() {
  }

  businessCoupons() {
   return new Promise<any>((resolve) => {
    console.log(this.authService.getUid());
    this.afs.collection('coupons', ref => ref.where('userId', '==', this.authService.getUid()))
    .valueChanges()
    .subscribe(coupon => resolve(coupon));
   });
  }
}
