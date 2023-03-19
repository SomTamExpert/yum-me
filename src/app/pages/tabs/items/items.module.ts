import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemsPageRoutingModule } from './items-routing.module';
import { ItemsPage } from './items.page';
import {ItemComponent} from "../../../components/item/item.component";
import {ComponentsModule} from "../../../components/components.module";
import {PlantShopDetailComponent} from "../../../components/plant-shop-detail/plant-shop-detail.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ItemsPage, ItemComponent, PlantShopDetailComponent]
})
export class ItemsPageModule {}
