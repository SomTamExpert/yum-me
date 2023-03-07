import {Restaurant} from "./restaurant.model";
import {Item} from "./item.model";
import {Address} from "./address.model";

export class Cart {
  constructor(
    public restaurant: Restaurant,
    public items: Item[],
    public totalItems: number,
    public totalPrice: number,
    public grandTotal: number,
    public location?: Address,
    public deliverCharge?: number,
  ) {
  }
}
