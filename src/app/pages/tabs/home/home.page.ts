import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api/api.service";
import {Restaurant} from "../../../models/restaurant.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private  api: ApiService){
  }

  banners: any[] = [];
  restaurants: Restaurant[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.restaurants = this.api.restaurants;
    this.banners = this.api.banners;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
