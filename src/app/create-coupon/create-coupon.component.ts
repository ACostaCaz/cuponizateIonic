import { Component } from '@angular/core';
import { CouponsService } from '../services/coupons.service';
import { AuthService } from '../services/auth.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss']
})
export class CreateCouponComponent {
  name!: string;
  ogCost!: string;
  business!: string;
  discounted!: string;
  description!: number;
  constructor(private couponsService: CouponsService, private auth: AuthService) { }

  createCoupon() {
    this.couponsService.create({
      id: uuid.v4(),
      business: this.business,
      name: this.name,
      ogCost: this.ogCost,
      discounted: this.discounted,
      description: this.description,
      userId: this.auth.getUid()
    });
  }

}
