import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ApiService} from "../api/api.service";
import {Order} from "../../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _orders = new BehaviorSubject<Order[]>([]);
  get orders() {
    return this._orders.asObservable();
  }

  constructor(private api: ApiService) {
  }

  placeOrder(param: any) {
    try {
      param.user_id = this.api.orders[0].user_id;
      param.id = this.api.orders[0].id;
      let currentOrders:Order[] = [];
      currentOrders.push(new Order(param.id, param.user_id, param.address, param.restaurant, param.restaurant_id, param.order, param.total, param.totalItems, param.grandTotal, param.deliveryCharge, param.status, param.time, param.paid
      ));
      currentOrders = currentOrders.concat(this._orders.value);
      this._orders.next(currentOrders);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  getOrders() {
    try {
      this._orders.next(this.api.orders);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
