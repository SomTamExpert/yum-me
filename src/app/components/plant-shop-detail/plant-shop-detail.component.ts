import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './plant-shop-detail.component.html',
  styleUrls: ['./plant-shop-detail.component.scss'],
})
export class PlantShopDetailComponent implements OnInit {

  @Input() data: any
  @Input() isLoading: boolean = false;
  constructor() { }

  ngOnInit() {}
  getCuisine(cuisines: any) {
    return cuisines.join(', ');
  }
}

