import { Component } from '@angular/core';
import { CouponsService } from '../services/coupons.service';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BusinessProfile } from '../interfaces/business-profile.interface';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as uuid from 'uuid';
@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss']
})
export class CreateCouponComponent {
  name!: string;
  ogCost!: string;
  business!: string;
  discounted!: string;
  description!: number;
  downloadURL: Observable<string>;
  couponImage: string;
  file: File;
  constructor(private route: ActivatedRoute,
    public afs: AngularFirestore, public auth: AngularFireAuth, private storage: AngularFireStorage,
    private couponsService: CouponsService, private authService: AuthService) { }

  createCoupon() {
    const couponId = uuid.v4();
    const filePath = '/couponImages/' + couponId;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,this.file);
    task.snapshotChanges().pipe(
      finalize(() =>
      {
        this.downloadURL = ref.getDownloadURL();
      this.downloadURL.subscribe(result => {
        this.couponImage = result;
        this.auth.onAuthStateChanged(user => {
          if (user) {
            this.couponsService.create({
              id: couponId,
              business: this.business,
              name: this.name,
              ogCost: this.ogCost,
              couponImage: this.couponImage,
              discounted: this.discounted,
              description: this.description,
              userId: user.uid
            });
          }
        });
      });}))
    .subscribe();


  }
  uploadImage(event) {
    this.file = event.target.files[0];
  }

}
