import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingController;

  constructor(private loadingCtrl: LoadingController) { }

  loader(message='loading ...', duration=null, mode: any='ios') {
    return new Promise(resolve => {
      const options = {
        message,
        duration,
        mode
      };
      this.loadingCtrl.create(options).then(el=>{
        el.present();
        resolve(true);
      });
    });
  }

  closeLoader() {
    this.loadingCtrl.dismiss();
  }
}
