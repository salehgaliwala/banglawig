import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-banner-modal',
  templateUrl: './text-banner-modal.component.html',
  styleUrls: ['./text-banner-modal.component.scss'],
})
export class TextBannerModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

}
