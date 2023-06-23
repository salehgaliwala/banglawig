
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  toast(message='something went wrong', color='danger', duration=2000, cssClass='controller.scss', mode: any='ios', position: any='top') {
    this.toastCtrl.create({
      message,
      color,
      mode,
      position,
      duration,
      cssClass,
    }).then(toaslEl=>{
      toaslEl.present();
    });
  }
}
