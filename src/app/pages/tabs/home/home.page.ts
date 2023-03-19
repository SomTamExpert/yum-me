import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api/api.service";
import {PlantShop} from "../../../models/plant-shop.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private  api: ApiService){
  }

  banners: any[] = [];
  restaurants: PlantShop[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.restaurants = this.api.plantShops;
    this.banners = this.api.banners;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
