import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './plant-shop.component.html',
  styleUrls: ['./plant-shop.component.scss'],
})
export class PlantShopComponent implements OnInit {
  @Input() restaurant: any;
  constructor() { }

  ngOnInit() {}

  getCuisines(cuisines: any) {
    return cuisines.join(', ');
  }

}
