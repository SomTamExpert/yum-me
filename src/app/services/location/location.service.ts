import {Injectable} from '@angular/core';
import {Geolocation, GeolocationPluginPermissions, PermissionStatus, PositionOptions} from '@capacitor/geolocation';
import {Capacitor} from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }

  async getCurrentLocation() {
    if (Capacitor.isNativePlatform()) {
      await this.requestGeolocationPermission();
    }
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      return;
    }
    const options: PositionOptions = {
      maximumAge: 3000,
      timeout: 8000,
      enableHighAccuracy: false
    }
    return await Geolocation.getCurrentPosition(options);
  }
  async requestGeolocationPermission() {
    try {
      const status = await Geolocation.requestPermissions();
      console.log('status: ', status)
      if (status.location === 'granted') {
      } else {
        console.log('Permission denied')
      }
    } catch (e) {
      console.log('error: ', e)
    }
  }
}
