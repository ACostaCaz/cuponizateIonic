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

@NgModule({
  declarations: [AppComponent,
    CouponComponent,
    CreateCouponComponent,
    EditCouponComponent,
    LoginComponent,
    RegisterComponent,
    BusinessProfileComponent,
    BusinessCouponsComponent,
    IndexComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
