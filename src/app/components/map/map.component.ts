import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

import {GoogleMapsService} from "../../services/google-maps/google-maps.service";
import {LocationService} from "../../services/location/location.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  // @ts-ignore
  @ViewChild('map', {static: true}) mapElementRef: ElementRef; // @ViewChild is used to get the reference of the element
  googleMaps: any;
  map: any;
  marker: any;
  @Input() update: boolean = false;
  @Input() center = {lat: 47.391255193224644, lng: 8.522312639601045};
  @Output() location: EventEmitter<any> = new EventEmitter<any>();
  mapListener: any;

  constructor(private maps: GoogleMapsService, private renderer: Renderer2, private locationService: LocationService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
  }

  async initMap() {
    try {
      if (!this.update) {
        const position = await this.locationService.getCurrentLocation();
        console.log('position: ', position)
        this.center = {
          // @ts-ignore
          lat: position.coords.latitude,
          // @ts-ignore
          lng: position.coords.longitude

        }
        await this.loadMap();
        this.getAddress(this.center.lat, this.center.lng);
      } else {
        await this.loadMap();
      }
    } catch (e) {
      console.log('error: ', e);
      this.loadMap();
    }
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.maps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement; // get the reference of the element
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      this.map = new this.googleMaps.Map(mapEl, {
        center: location,
        zoom: 16,
        streetViewControl: false,
        zoomControl: false,
        overviewMapControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [googleMaps.MapTypeId.RoadMap, 'yumMe']
        },
      });
      const style = [
        {featureType: 'all', elementType: 'all', stylers: [{saturation: -100}]},
      ]
      var mapType = new googleMaps.StyledMapType(style, {name: 'Grayscale'});
      this.map.mapTypes.set('yumMe', mapType);
      this.map.setMapTypeId('yumMe');
      this.renderer.addClass(mapEl, 'visible');
      this.addMarker(location);
    } catch (e) {
      console.log('error: ', e);
    }
  }

  addMarker(location: any) {
    let googleMaps: any = this.googleMaps;
    this.marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      draggable: true,
      animation: googleMaps.Animation.DROP,
    });
    this.googleMaps.event.addListener(this.marker, 'dragend', () => {
      this.getAddress(this.marker.position.lat(), this.marker.position.lng());
    });
  }

  async getAddress(lat: any, lng: any) {
    try {
      const address = await this.maps.getAddress(lat, lng);
      console.log('address: ', address);
      const loc = {
        location_name: address.address_components[0].short_name,
        address: address.formatted_address,
        lat,
        lng
      };
      console.log('loc: ', loc)
      this.location.emit(loc);
    } catch (e) {
      console.log('error: ', e);
    }
  }

  ngOnDestroy() {
    if (!this.mapListener) this.googleMaps.event.removeListener(this.mapListener);
  }

}
