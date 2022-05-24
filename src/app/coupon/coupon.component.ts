import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coupon } from '../interfaces/coupon.interface';
import * as uuid from 'uuid';

import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { JsonSQLite } from '@capacitor-community/sqlite';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  coupons!: Coupon;
  code!: string;
  storage: any;
  constructor(private route: ActivatedRoute,private readonly afs: AngularFirestore, private databaseService: DatabaseService) {
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

  addFavorite() {
    this.databaseService.addFavorite(this.coupons);
  }

}
