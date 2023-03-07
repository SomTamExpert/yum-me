import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import SwiperCore, {EffectFade, Keyboard, Pagination, SwiperOptions} from "swiper";

SwiperCore.use([EffectFade, Keyboard, Pagination]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterContentChecked {

  constructor() {
  }

  @Input() bannerImages: any;
  config: SwiperOptions = {}

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.config = {
      slidesPerView: 1,
      pagination: {clickable: true},
      keyboard: true,
      effect: 'fade',
    };
  }

}
