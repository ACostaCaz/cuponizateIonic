import { Injectable } from '@angular/core';

import '@capacitor-community/sqlite';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { JsonSQLite } from '@capacitor-community/sqlite';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db!: SQLiteObject;
  storage!: any;
  data!: any;
  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) =>
        { this.db = db;
        db.executeSql('create table favorites (id VARCHAR(255), business VARCHAR(255), name VARCHAR(255),' +
          'ogCost double, discounted double, description VARCHAR(255)) IF NOT EXISTS;', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

  }

  addFavorite(favorite: any) {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) =>
        { this.db = db;
        db.executeSql('INSERT INTO favorites VALUES (?, ?, ?, ?, ?, ?)', [favorite.id, favorite.business, favorite.name,
                      favorite.ogCost, favorite.discounted, favorite.description])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

    }

    removeFavorite(favorite: any) {

      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) =>
          { this.db = db;
          db.executeSql('DELETE FROM favorites WHERE id = (?)',[favorite.id])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      }

  showFavorites() {


    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) =>
        { this.db = db;
        db.executeSql('SELECT * FROM favorites;',[])
        .then(result => {console.log('Executed SQL');
        this.data = result;
        console.log(result.rows.item(0));
      })
        .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

      return this.data;
  }

}
