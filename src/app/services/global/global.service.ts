import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLoading: boolean = false;
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private modalCtrl: ModalController) {

  }

  showAlert(message: string, header?: string, buttonsArray?: any[]) {
    this.alertCtrl.create({
      header: header ? header : 'Authentication failed',
      message: message,
      buttons: buttonsArray ? buttonsArray : ['OK']
    }).then(alert => alert.present());
  }

  async showToast(message: string, duration?: number, color?: string, position?: any) {
    await this.toastCtrl.create({
      message: message,
      duration: duration ? duration : 2000,
      color: color = color ? color : 'dark',
      position: position ? position : 'bottom'
    }).then(toast => toast.present());
  }

  errorToast(message?: string, duration = 4000) {
    this.showToast(message ? message : 'Something went wrong', duration, 'danger', 'bottom');
  }

  successToast(message?: string) {
    this.showToast(message ? message : 'Success', 3000, 'success', 'bottom');
  }

  showLoader(message?: string) {
    return this.loadingCtrl.create({
      message: message ? message : 'Please wait...',
      spinner: 'crescent',
    }).then(loader => loader.present().then(() => {
      if (!this.isLoading) {
        loader.dismiss().then(() => console.log('abort presenting'))
      }
    })
      .catch(err => console.log(err)
      ));
  }

  hideLoader() {
    this.isLoading = false;
    return this.loadingCtrl.dismiss().then(() => console.log('dismissed')).catch(err => console.log(err));
  }

  getIcon(address: any) {
    const name = address.title.toLowerCase();
    if (name === 'home') {
      return 'home-outline';
    } else if (name === 'work') {
      return 'briefcase-outline';
    } else {
      return 'location-outline';
    }
  }
}

