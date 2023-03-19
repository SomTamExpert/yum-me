import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlantShopComponent} from "./plant-shop/plant-shop.component";
import {IonicModule} from "@ionic/angular";
import {LoadingRestaurantComponent} from "./loading-restaurant/loading-restaurant.component";
import {EmptyScreenComponent} from "./empty-screen/empty-screen.component";

@NgModule({
  declarations: [
    PlantShopComponent,
    LoadingRestaurantComponent,
    EmptyScreenComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PlantShopComponent,
    LoadingRestaurantComponent,
    EmptyScreenComponent
  ],
  entryComponents: []
})
export class ComponentsModule {
}
