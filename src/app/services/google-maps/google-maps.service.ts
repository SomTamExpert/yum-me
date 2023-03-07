import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(private http: HttpClient) {
  }

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => { // Promise will be resolved when the script is loaded to the DOM
      const script = document.createElement('script'); // creates a script
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsAPIKey + '&callback=Function.prototype'; // sets the src attribute of the script
      script.async = true; // async  will control the loading of the script
      script.defer = true; // defer will control the loading of the script
      document.body.appendChild(script); // appends the script to the body of the DOM
      script.onload = () => { // onload will be called when the script is loaded to the DOM
        const googleModule = win.google; // gets the Google module from the window
        if (googleModule && googleModule.maps) {
          resolve(googleModule.maps); // resolves the promise
        } else {
          reject('Google maps SDK not available');
        }
      };
    });
  }

  getAddress(lat: number, lng: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`)
        .pipe(map((geoData: any) => {
            if (!geoData || !geoData.results || geoData.results.length === 0) {
              throw null;
            }
            return geoData.results[0];
          })
        ).subscribe((address: any) => {
        resolve(address);
      }, error => {
        reject(error);
      });
    });
  }
}
