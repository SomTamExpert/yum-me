import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {GlobalService} from '../global/global.service';
import {StorageService} from '../storage/storage.service';
import {Cart} from "../../models/cart.model";
import {Item} from "../../models/item.model";
import {PlantShop} from "../../models/plant-shop.model";
import {Order} from "../../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  model = {} as Cart;
  deliverCharge = 20;
  // @ts-ignore
  private _cart = new BehaviorSubject<Cart>(null);

  get cart() {
    return this._cart.asObservable();
  }

  constructor(
    private storage: StorageService,
    private global: GlobalService,
    private router: Router
  ) {
  }

  getCart() {
    return this.storage.getStorage('cart');
  }

  async getCartData() {
    let data: any = await this.getCart();
    if (data?.value) {
      this.model = await JSON.parse(data.value);
      await this.calculate();
      this._cart.next(this.model);
    }
  }

  alertClearCart(index: any, items: any, data: any, order?: any) {
    this.global.showAlert(
      order ? 'Would you like to reset your cart before re-ordering from this restaurant?' : 'Your cart contain items from a different restaurant. Would you like to reset your cart before browsing the restaurant?', 'Items already in Cart',
      [
        {
          text: 'No', role: 'cancel', handler: () => { return; }
        },
        {
          text: 'Yes',
          handler: () => {
            this.clearCart();
            this.model = {} as Cart
            if (order) {
              this.orderToCart(order);
            } else this.quantityPlus(index, items, data);
          }
        }
      ]
    )
  }

  async orderToCart(order: Order) {
    const data = {
      restaurant: order.plantShop,
      items: order.order
    };
    // @ts-ignore
    this.model = data;
    await this.calculate();
    this.saveCart();
    this._cart.next(this.model);
    this.router.navigate(['/', 'tabs', 'plantShops', order.plantShop_id]);
  }

  async quantityPlus(index: any, items?: Item[], plantShop?: PlantShop) {
    try {
      if (items) {
        this.model.items = [...items];
      }
      if (plantShop) {
        this.model.plantShop = plantShop;
      }
      if (!this.model.items[index].quantity || this.model.items[index].quantity == 0) {
        this.model.items[index].quantity = 1;
      } else {
        // @ts-ignore
        this.model.items[index].quantity += 1;
      }
      await this.calculate();
      this._cart.next(this.model);
    } catch (e) {
      console.log(e);
      throw(e);
    }
  }

  async quantityMinus(index: any, items?: Item[]) {
    try {
      if (items) {
        this.model.items = [...items];
      }
      if (this.model.items[index].quantity && this.model.items[index].quantity !== 0) {
        // @ts-ignore
        this.model.items[index].quantity -= 1;
      } else {
        this.model.items[index].quantity = 0;
      }
      await this.calculate();
      this._cart.next(this.model);
    } catch (e) {
      console.log(e);
      throw(e);
    }
  }

  async calculate() {
    // @ts-ignore
    let item = this.model.items.filter((x: { quantity: any; }) => x.quantity > 0);
    this.model.items = item;
    this.model.totalPrice = 0;
    this.model.totalItems = 0;
    this.model.deliverCharge = 0;
    this.model.grandTotal = 0;
    // @ts-ignore
    item.forEach((element: { quantity: any; price: any; }) => {
      this.model.totalItems += element.quantity;
      this.model.totalPrice += element.price * element.quantity;
    });
    this.model.deliverCharge = this.deliverCharge;
    this.model.grandTotal = this.model.totalPrice + this.model.deliverCharge;
    if (this.model.totalItems == 0) {
      this.model.totalItems = 0;
      this.model.totalPrice = 0;
      this.model.grandTotal = 0;
      await this.clearCart();
      this.model = {} as Cart;
    }
  }

  async clearCart() {
    this.global.showLoader();
    await this.storage.removeStorage('cart');
    // @ts-ignore
    this._cart.next(null);
    this.global.hideLoader();
  }

  saveCart(model?: any) {
    if (model) this.model = model;
    this.storage.setStorage('cart', JSON.stringify(this.model));
  }

}
