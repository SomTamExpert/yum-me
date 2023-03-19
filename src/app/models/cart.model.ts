import {PlantShop} from "./plant-shop.model";
import {Item} from "./item.model";
import {Address} from "./address.model";

export class Cart {
  constructor(
    public plantShop: PlantShop,
    public items: Item[],
    public totalItems: number,
    public totalPrice: number,
    public grandTotal: number,
    public location?: Address,
    public deliverCharge?: number,
  ) {
  }
}
