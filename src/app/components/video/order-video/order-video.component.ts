import { StorageService } from './../../../services/storage.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-video',
  templateUrl: './order-video.component.html',
  styleUrls: ['./order-video.component.scss'],
})
export class OrderVideoComponent implements OnInit {

  timer = 30000;
  progressBarValue = 0.1;
  disableButton = true;
  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    const interval = this.timer/100;
    let totalTime = 0;
    const timeInterval = setInterval(()=>{
      totalTime += interval;
      //this.progressBarValue += (1/interval);
      this.progressBarValue += 0.1;
      if(totalTime >= this.timer){
        clearInterval(timeInterval);
      }
    },interval);
    setTimeout(()=>{
      this.disableButton = false;
    },this.timer);
  }

  confirmOrder(confirm){
    if(confirm){
      this.storageService.set('first_order_completed', true);
    }
      this.modalCtrl.dismiss({
        confirm
      });
  }

}
