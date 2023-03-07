import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BehaviorSubject} from "rxjs";
import {Address} from "../../models/address.model";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _addresses = new BehaviorSubject<Address[]>([]);

  constructor(private api: ApiService) {

  }

  get addresses() {
    return this._addresses.asObservable();
  }

  async getAddresses() {
    try {
      this._addresses.next(this.api.addresses);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async addAddress(param: any) {
    param.id = '5aG0RsPuze8NX00B7uE2';
    param.user_id = '1';
    const currentAddresses = this._addresses.value;
    currentAddresses.push(new Address(
      param.id,
      param.user_id,
      param.title,
      param.address,
      param.city,
      param.zip,
      param.canton,
      param.lat,
      param.lng,
    ));
    this._addresses.next(currentAddresses);
  }

  async updateAddress(id: string, param: any) {
    param.id = id;
    console.log('param: ', param)
    let currentAddresses = this._addresses.value;
    const index = currentAddresses.findIndex(address => address.id === id);
    currentAddresses[index] = new Address(
      param.id,
      param.user_id,
      param.title,
      param.address,
      param.city,
      param.zip,
      param.canton,
      param.lat,
      param.lng,
    );
    this._addresses.next(currentAddresses);
  }

  deleteAddress(param: any) {
    let currentAddresses = this._addresses.value;
    currentAddresses = currentAddresses.filter(address => address.id !== param.id);
    this._addresses.next(currentAddresses);
  }
}
