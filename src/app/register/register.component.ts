import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email!: string;
  username!: string;
  password!: string;
  passwordRepeat?: string;
  address!: string;
  name!: string;
  constructor(public authService: AuthService, public router: Router) { }
  register() {
    if (this.password === this.passwordRepeat) {
      this.authService.register({email: this.email,password: this.password}, {
        address: this.address,
        name: this.name
      });
    } else {
      console.log('Passwords do not match');
    }
  }
}
