import { Component, OnInit } from '@angular/core';
import { profileService } from '../services/profile.service';
import {AuthService} from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  constructor(private profileService: profileService, private authService: AuthService,private storage: AngularFireStorage) { }

  ngOnInit(): void {
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

    this.profileService.create({
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

}
