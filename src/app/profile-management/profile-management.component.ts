import { Component, OnInit } from '@angular/core';
import { profileService } from '../services/profile.service';
import {AuthService} from '../services/auth.service';
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
  // eslint-disable-next-line @typescript-eslint/no-shadow
  constructor(private profileService: profileService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  createProfile() {
    this.profileService.create({
      id: this.authService.getUid(),
      address: this.address,
      name: this.name,
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
