import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {IonContent, NavController} from "@ionic/angular";
import * as moment from "moment";
import {GlobalService} from "../../../services/global/global.service";
import {OrderService} from "../../../services/order/order.service";
import {CartService} from "../../../services/cart/cart.service";
import {Subscription} from "rxjs";
import {Address} from "../../../models/address.model";
import {Cart} from "../../../models/cart.model";
import {Order} from "../../../models/order.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  urlCheck: any;
  url: any;
  model = {} as Cart;
  deliveryCharge: number = 15;
  instruction: any;
  location = {} as Address;
  cartSub: Subscription = new Subscription();
  @ViewChild(IonContent, {static: false}) content: IonContent | undefined;

  constructor(private navCtrl: NavController, private router: Router, private global: GlobalService, private orderService: OrderService, private cartService: CartService) {
  }

  ngOnInit() {
    this.cartSub = this.cartService.cart.subscribe((cart: any) => {
      this.model = cart;
      if (!this.model) {
        this.location = {} as Address;
      }
    });
    this.getData();
  }

  getPreviousUrl() {
    return this.url.join('/');
  }

  checkUrl() {
    let url: any = this.router.url.split('/');
    const spliced = url.splice(url.length - 2, 2) // remove last two elements
    this.urlCheck = spliced[0];
    url.push(this.urlCheck);
    this.url = url;
  }

  async getData() {
    await this.checkUrl();
    this.location = {
      id: '1dsfsasd',
      user_id: '1dsfsaassd',
      title: 'Home',
      address: 'Rue de la Gare',
      city: 'Lausanne',
      zip: '1000',
      canton: 'Vaud',
      lat: 46.5196535,
      lng: 6.6322734,
    }
    await this.cartService.getCartData();
  }

  quantityMinus(index: number) {
    this.cartService.quantityMinus(index);
  }

  quantityPlus(index: number) {
    this.cartService.quantityPlus(index);
  }

  addAddress() {
  }

  changeAddress() {
  }

  async makePayment() {
    try {
      //@ts-ignore
      const data: Order = {restaurant_id: this.model.restaurant.uid, instruction : this.instruction? this.instruction : '', restaurant: this.model.restaurant, order: this.model.items, time: moment().format('lll'), address: this.location, total: this.model.totalPrice, grandTotal: this.model.grandTotal, deliveryCharge: this.model.deliverCharge, status: 'created', paid: 'COD' };
      await this.orderService.placeOrder(data);
      await this.cartService.clearCart();
      this.model = {} as Cart;
      this.global.successToast('Order placed successfully');
      this.navCtrl.navigateRoot('/tabs/account');
    } catch (e) {
      console.log(e)
    }
  }

  scrollToBottom() {
    this.content?.scrollToBottom(500);
  }

  ionViewWillLeave() {
    if(this.model?.items && this.model?.items.length > 0){
      this.cartService.saveCart();
    }
  }
}
