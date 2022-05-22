import { Component } from '@angular/core';
import { CouponsService } from '../services/coupons.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Coupon } from '../interfaces/coupon.interface';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent{
  private couponsCollection: AngularFirestoreCollection<Coupon>;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  coupons: Observable<Coupon[]>;
  constructor(private readonly afs: AngularFirestore, private authService: AuthService) {
    this.couponsCollection = afs.collection<Coupon>('coupons');
    this.coupons = this.couponsCollection.valueChanges();
  }

}
