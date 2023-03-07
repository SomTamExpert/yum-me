import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../../services/order/order.service";
import {GlobalService} from "../../../services/global/global.service";
import {CartService} from "../../../services/cart/cart.service";
import {Order} from "../../../models/order.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

  order = {} as Order;
  profile: any = {};
  isLoading: boolean = false;
  orders: Order[] = [];
  ordersSubscription: any = new Subscription();

  constructor(private orderService: OrderService, private global: GlobalService, private cartService: CartService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.ordersSubscription = this.orderService.orders.subscribe((orders: any) => {
      this.orders = orders;
    });
    this.getOrders();
    this.getProfile();
  }

  ngOnDestroy() {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }

  logout() {
  }

  getProfile() {
    this.profile = {
      name: 'John Doe',
      phone: '910940908940',
      email: 'john.doe@gmail.com'
    }
  }

  getOrders() {
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(() => {
      this.orderService.getOrders();
      this.isLoading = false;
      this.global.hideLoader();
    }, 2000);
  }

  editProfile(profile: any) {
    console.log('edit profile ', profile)
  }

  async orderAgain(order: Order) {
    console.log('order again ', order)
    let data: any = await this.cartService.getCart();
    if (data?.value) {
      this.cartService.alertClearCart(null, null, null, order);
    } else {
      this.cartService.orderToCart(order);
    }
  }

  getHelp(order: Order) {
    console.log('get help ', order)
  }
}
