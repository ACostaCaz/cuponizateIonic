import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  id!: string;
  constructor(public auth: AngularFireAuth) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.id = 'businessprofile/' + user.uid;
      } else {
        this.id = 'profilemanagement';
      }
    });
  }

  ngOnInit(): void {
  }

}
