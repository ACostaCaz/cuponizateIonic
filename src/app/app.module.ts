import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CouponComponent } from './coupon/coupon.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { BusinessCouponsComponent } from './business-coupons/business-coupons.component';
import { IndexComponent } from './index/index.component';
import { FavCouponsComponent } from './fav-coupons/fav-coupons.component';
import { environment } from '../environments/environment';

import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';

@NgModule({
  declarations: [AppComponent,
    CouponComponent,
    CreateCouponComponent,
    EditCouponComponent,
    LoginComponent,
    RegisterComponent,
    BusinessProfileComponent,
    BusinessCouponsComponent,
    IndexComponent,
    FavCouponsComponent,
    NavbarComponent,
    ProfileManagementComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, AngularFirestoreModule, FormsModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
