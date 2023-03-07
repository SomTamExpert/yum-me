import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInput} from "@ionic/angular";
import {ApiService} from "../../../services/api/api.service";
import {Restaurant} from "../../../models/restaurant.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchInput') searchInput: any;

  model: any = {
    icon: 'search-outline',
    title: 'No Restaurants Found',
    subTitle: 'Try searching for something else',
  }
  query: any;
  isLoading: boolean = false;
  allRestaurants: Restaurant[] = [];

  restaurants: Restaurant[] = [];
  constructor(private api: ApiService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.allRestaurants = this.api.restaurants;
      this.searchInput.setFocus()
    }, 500);
  }

  async onSearchChange(event: any) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.restaurants = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async() => {
        this.restaurants = this.allRestaurants.filter((restaurant: any) => {
          return restaurant.short_name.includes(this.query);
        });
        console.log(this.restaurants);
        this.isLoading = false;
      }, 3000);
    }
  }
}
