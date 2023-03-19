import {Item} from "./item.model";

import {Address} from "./address.model";
import {PlantShop} from "./plant-shop.model";

export class Order {
  constructor(public id: string,
              public user_id: string,
              public address: Address,
              public plantShop: PlantShop,
              public plantShop_id: string,
              public order: Item[],
              public total: number,
              public totalItems: number,
              public grandTotal: number,
              public deliveryCharge: number,
              public status: string,
              public time: string,
              public paid: string,
              public instruction?: string

  ) {}
}
