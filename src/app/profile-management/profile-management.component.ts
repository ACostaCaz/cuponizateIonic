import { Component, OnInit } from '@angular/core';
import { profileService } from '../services/profile.service';
import {AuthService} from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BusinessProfile } from '../interfaces/business-profile.interface';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {
  name!: string;
  address!: string;
  monday!: string;
  tuesday!: string;
  wednesday!: string;
  thursday!: string;
  friday!: string;
  saturday!: string;
  sunday!: string;
  downloadURL: Observable<string>;
  profileUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  id !: string;
  private itemDoc: AngularFirestoreDocument<BusinessProfile>;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  item: Observable<BusinessProfile>;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  constructor(private profileService: profileService, private authService: AuthService, private route: ActivatedRoute,
    public afs: AngularFirestore, public auth: AngularFireAuth, private storage: AngularFireStorage) { }

  ngOnInit(): void {
   this.auth.onAuthStateChanged(user => {
    if (user) {
      this.id = user.uid;
      this.buProfile(user.uid);
      this.item.subscribe(data => {
        this.address= data.address;
        this.name= data.name;
        this.monday= data.monday;
        this.profileUrl=data.imageurl;
        this.tuesday= data.tuesday;
        this.wednesday= data.wednesday;
        this.thursday= data.thursday;
        this.friday= data.friday;
        this.saturday= data.saturday;
        this.sunday= data.sunday;
      });

    }
  });
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const filePath = '/userImages/' + this.id;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    task.snapshotChanges().pipe(
      finalize(() =>
      {
        this.downloadURL = ref.getDownloadURL();
      this.downloadURL.subscribe(result => {
        this.profileUrl = result;
      });}))
    .subscribe();
  }
  createProfile() {
    this.profileService.update(this.id,{
      id: this.id,
      address: this.address,
      name: this.name,
      imageurl: this.profileUrl,
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
      sunday: this.sunday
    });
  }

  buProfile(id: string) {
    this.itemDoc = this.afs.doc<BusinessProfile>('profiles/'+id);
    this.item = this.itemDoc.valueChanges();
    console.log(this.item);
   }

}
