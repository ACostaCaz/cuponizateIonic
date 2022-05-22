import { Component, OnInit } from '@angular/core';
import { profileService } from '../services/profile.service';
import {AuthService} from '../services/auth.service';
<<<<<<< HEAD
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
=======
import { ActivatedRoute } from '@angular/router';
import { BusinessProfile } from '../interfaces/business-profile.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
>>>>>>> f0b26defddb939bfcfa6aa96545545fe70f20ec5
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
<<<<<<< HEAD
  downloadURL: Observable<string>;
  profileUrl: string;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  constructor(private profileService: profileService, private authService: AuthService,private storage: AngularFireStorage) { }
=======
  id !: string;
  profile!: BusinessProfile;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  constructor(private profileService: profileService, private authService: AuthService, private route: ActivatedRoute,
    private readonly afs: AngularFirestore, public auth: AngularFireAuth) { }
>>>>>>> f0b26defddb939bfcfa6aa96545545fe70f20ec5

  ngOnInit(): void {
   this.auth.onAuthStateChanged(user => {
    if (user) {
      this.id = user.uid;
      this.buProfile(user.uid).then(profile => {
        this.profile = profile[0];
        this.id= this.profile.id;
        this.address= this.profile.address;
        this.name= this.profile.name;
        this.monday= this.profile.monday;
        this.tuesday= this.profile.tuesday;
        this.wednesday= this.profile.wednesday;
        this.thursday= this.profile.thursday;
        this.friday= this.profile.friday;
        this.saturday= this.profile.saturday;
        this.sunday= this.profile.sunday;
      });
    }
  });
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const filePath = '/userImages/' + 'mikasa';
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
<<<<<<< HEAD

    this.profileService.create({
=======
    this.profileService.update(this.id,{
      id: this.id,
>>>>>>> f0b26defddb939bfcfa6aa96545545fe70f20ec5
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
    return new Promise<any>((resolve) => {
     this.afs.collection('profiles/' + id)
     .valueChanges()
     .subscribe(profile => resolve(profile));
    });
   }

}
