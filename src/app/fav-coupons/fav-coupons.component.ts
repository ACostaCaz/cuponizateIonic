import { Component, OnInit } from '@angular/core';


import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { JsonSQLite } from '@capacitor-community/sqlite';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-fav-coupons',
  templateUrl: './fav-coupons.component.html',
  styleUrls: ['./fav-coupons.component.scss'],
})
export class FavCouponsComponent implements OnInit {
  storage: any;

  constructor(private sqlite: SQLite) { }

  ngOnInit() {}

  addFavorite(favorite: any): void{
    let favorites = this.storage.get('favorites');
    if(favorites){
      favorites.push(favorite);
      this.storage.set('favorites', favorites);
    }else{
      favorites = [];
      favorites.push(favorite);
      this.storage.set('favorites',favorites);
    }


  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {


      db.executeSql('create table favorites (id, business, name, ogCost, discounted, description, userId)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));


    })
    .catch(e => console.log(e));

  }
}
