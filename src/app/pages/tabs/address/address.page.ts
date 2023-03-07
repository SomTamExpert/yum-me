import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from "../../../services/global/global.service";
import {AddressService} from "../../../services/address/address.service";
import {Subscription} from "rxjs";
import {Address} from "../../../models/address.model";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit, OnDestroy {
  isLoading: boolean = false;
  addresses: Address[] = [];
  addressSubscription: Subscription = new Subscription();
  address: any = {};
  model: any = {
    title: 'No Address Added yet',
    icon: 'location-outline'
  };

  constructor(private global: GlobalService, private addressService: AddressService, private router: Router) {
  }

  ngOnInit() {
    this.addressSubscription = this.addressService.addresses.subscribe((addresses: any) => {
      this.addresses = addresses;
    });
    this.getAddresses();
  }

  ngOnDestroy() {
    if (this.addressSubscription) {
      this.addressSubscription.unsubscribe();
    }
  }

  editAddress(address: any) {
    const navData: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(address)
      }
    };
    this.router.navigate([this.router.url, 'edit-address'], navData);
  }

  deleteAddress(address: Address) {
    this.global.showAlert('Are you sure you want to delete this address?', 'Confirm', [{
      text: 'No', role: 'cancel', handler: () => {
        return
      }
    }, {
      text: 'Yes', role: 'delete', handler: () => {
        this.global.showLoader();
        this.addressService.deleteAddress(address);
        this.global.hideLoader();
      }
    }]);
  }

  addAddress() {
  }

  getIcon(address: Address) {
    return this.global.getIcon(address);
  }

  getAddresses() {
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(() => {
      this.addressService.getAddresses();
      this.isLoading = false;
      this.global.hideLoader();
    }, 2000);
  }
}
