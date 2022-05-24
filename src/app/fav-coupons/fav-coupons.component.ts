import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatabaseService } from '../services/database.service';



@Component({
  selector: 'app-fav-coupons',
  templateUrl: './fav-coupons.component.html',
  styleUrls: ['./fav-coupons.component.scss'],
})
export class FavCouponsComponent implements OnInit {
  storage: any;
  data: any = [];
  constructor(private sqlite: SQLite, private databaseService: DatabaseService, public router: Router) { }

  ngOnInit() {
    this.showFavorites();
  }

  showFavorites() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) =>
        {
        db.executeSql('SELECT * FROM favorites;',[])
        .then(result => {console.log('Executed SQL');
        for (let i = 0; i < result.rows.length; i++) {
          console.log(result.rows.item(i));
          this.data.push(result.rows.item(i));
        }
        console.log(this.data);
      })
        .catch(e => console.log(e));
        })
        .catch(e => console.log(e));


  }

  removeFavorite(coupon: any) {
    this.databaseService.removeFavorite(coupon);
    this.data = this.data.filter(item => item.id !== coupon.id);
    this.router.navigateByUrl('/favCoupons');
  }
}
