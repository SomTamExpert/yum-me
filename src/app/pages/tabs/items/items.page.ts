import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {ApiService} from 'src/app/services/api/api.service';
import {CartService} from 'src/app/services/cart/cart.service';
import {take} from 'rxjs/operators';
import {Restaurant} from "../../../models/restaurant.model";
import {Category} from "../../../models/category.model";
import {Item} from "../../../models/item.model";

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {

  id: any;
  data = {} as Restaurant;
  items: Item[] = [];
  veg: boolean = false;
  isLoading: boolean = false;
  cartData: any = {};
  storeData: any = {};
  model = {
    icon: 'fast-food-outline',
    title: 'No Menu Available'
  };
  categories: Category[] = [];
  allItems: Item[] = [];
  cartSub: Subscription | undefined;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe(paramMap => {
      if (!paramMap.has('restaurantId')) {this.navCtrl.back(); return;}
      this.id = paramMap.get('restaurantId');
    });
    this.cartSub = this.cartService.cart.subscribe(cart => { this.cartData = {}; this.storeData = {};
      if (cart && cart?.totalItems > 0) { this.storeData = cart; this.cartData.totalItems = this.storeData.totalItems; this.cartData.totalPrice = this.storeData.totalPrice;
        if (cart?.restaurant?.uid === this.id) {
          // @ts-ignore
          this.allItems.forEach(element => { cart.items.forEach((element2: { id: any; quantity: any; }) => {
              if (element.id != element2.id) return; element.quantity = element2.quantity;
            });
          });
          // @ts-ignore
          this.cartData.items = this.allItems.filter(x => x.quantity > 0);
          if (this.veg) this.items = this.allItems.filter(x => x.veg);
          else this.items = [...this.allItems]; } else { this.allItems.forEach(element => { element.quantity = 0; });
          if (this.veg) this.items = this.allItems.filter(x => x.veg);
          else this.items = [...this.allItems];
        }
      }
    });
    this.getItems();
  }

  async getItems() {
    try {
      this.isLoading = true;
      this.data = {} as Restaurant;
      this.cartData = {};
      this.storeData = {};
      setTimeout(async () => {
        this.allItems = this.api.allItems;
        let data: any = this.api.restaurants1.filter(x => x.uid === this.id);
        this.data = data[0];
        this.categories = this.api.categories.filter(x => x.uid === this.id);
        this.allItems = this.api.allItems.filter(x => x.uid === this.id);
        this.allItems.forEach((element, index) => {
          this.allItems[index].quantity = 0;
        });
        this.items = [...this.allItems];
        await this.cartService.getCartData();
        this.isLoading = false;
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  }

  vegOnly(event: any) {
    console.log(event.detail.checked);
    this.items = [];
    if (event.detail.checked == true) this.items = this.allItems.filter(x => x.veg === true);
    else this.items = this.allItems;
    console.log('items: ', this.items);
  }

  quantityPlus(item: { id: any; }) {
    const index = this.allItems.findIndex(x => x.id === item.id);
    if (!this.allItems[index].quantity || this.allItems[index].quantity == 0) {
      if (!this.storeData.restaurant || (this.storeData.restaurant && this.storeData.restaurant.uid == this.id)) {
        this.cartService.quantityPlus(index, this.allItems, this.data);
      } else {
        // alert for clear cart
        this.cartService.alertClearCart(index, this.allItems, this.data);
      }
    } else {
      this.cartService.quantityPlus(index, this.allItems, this.data);
    }
  }

  quantityMinus(item: { id: any; }) {
    const index = this.allItems.findIndex(x => x.id === item.id);
    this.cartService.quantityMinus(index, this.allItems);
  }

  saveToCart() {
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      this.cartService.saveCart();
    } catch (e) {
      console.log(e);
    }
  }

  async viewCart() {
    if (this.cartData.items && this.cartData.items.length > 0) await this.saveToCart();
    this.router.navigate([this.router.url + '/cart']);
  }

  async ionViewWillLeave() {
    if (this.cartData?.items && this.cartData?.items.length > 0) await this.saveToCart();
  }

  ngOnDestroy() {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

}
