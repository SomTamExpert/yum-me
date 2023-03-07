import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {AddressService} from "../../../../services/address/address.service";
import {GlobalService} from "../../../../services/global/global.service";
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {

  form: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  location: any = {};
  isLoading: boolean = false;
  isLocationFetched: boolean = false;
  center: any;
  update: boolean = false;
  id: any;

  constructor(private addressService: AddressService, private globalService: GlobalService, private navCtrl: NavController, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.checkForUpdate();
  }

  checkForUpdate() {
    this.isLoading = true;
    this.location.location_name = 'Locating...';
    this.isLocationFetched = false;
    this.route.queryParams.subscribe(params => {
      if (params && params?.['data']) {
        const data = JSON.parse(params['data']);
        this.center = {
          lat: data.lat,
          lng: data.lng
        }
        this.update = true;
        this.location.lat = this.center.lat;
        this.location.lng = this.center.lng;
        this.location.location_name = data.address;
        this.location.zip = data.zip;
        this.location.city = data.city;
        this.location.canton = data.canton;
        this.id = data.id;
        console.log('data after assigning: ', data)
        this.initForm(data);
        this.toggleFetchLocation()
      } else {
        this.update = false;
        this.initForm();
      }
    });
  }

  initForm(address?: any) {
    let data = {
      title: '',
      address: '',
      zip: '',
      city: '',
      canton: '',
    };
    if (address) {
      data = {
        title: address.title,
        address: address.address,
        zip: address.zip,
        city: address.city,
        canton: address.canton,
      };
    }
    console.log('data for forms: ', data)
    this.form = new FormGroup({
      title: new FormControl(data.title, {validators: [Validators.required]}),
      address: new FormControl(data.address, {validators: [Validators.required]}),
      zip: new FormControl(data.zip, {validators: [Validators.required]}),
      city: new FormControl(data.city, {validators: [Validators.required]}),
    });
    this.isLoading = false;
  }

  toggleSubmit() {
    this.isSubmitted = !this.isSubmitted;
  }

  toggleFetchLocation() {
    this.isLocationFetched = !this.isLocationFetched;
  }

  async onSubmit() {
    try {
      this.toggleSubmit()
      console.log('form: ', this.form.value);
      if (!this.form.valid || !this.isLocationFetched) {
        console.log('form not valid: ', this.form.valid, this.isLocationFetched)
        this.toggleSubmit();
        return;
      }
      const data: any = {
        title: this.form.value.title,
        address: this.form.value.address,
        zip: this.form.value.zip,
        city: this.form.value.city,
        canton: this.form.value.canton,
        lat: this.location.lat,
        lng: this.location.lng,
      };
      console.log('data: ', data);
      if (!this.id) {
        await this.addressService.addAddress(data);
      } else {
        await this.addressService.updateAddress(this.id, data);
      }
      this.navCtrl.back();
      this.toggleSubmit();
    } catch (e) {
      console.log('error: ', e);
      this.globalService.errorToast();
    }
  }

  fetchLocation(event: any) {
    console.log('fetchLocation', event);
    this.location = event;
    this.isLocationFetched = true;
  }

}
