import { EditAddressPage } from './edit-address/edit-address.page';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddressSingle } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address/address.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit, OnDestroy {

  addresses: AddressSingle[] = [];
  addressSub: Subscription;
  addressLoading = true;

  constructor(
    private addressService: AddressService,
    private modalCtrl: ModalController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getAddress();
    this.addressSub = this.addressService.address.subscribe(addresses=>{
      this.addresses = addresses;
    });
  }

  getAddress() {
    this.addressLoading = true;
    this.addressService.fetchAddress().subscribe(res=>{
      this.addressLoading = false;
    });
  }

  addAddressRef() {
    this.authService.addReferrer('/tabs/account/address');
  }

  onEdit(address) {
    this.modalCtrl.create({
      component: EditAddressPage,
      componentProps: {
        defaultValues: address
      },
      cssClass: 'preview-modal'
    }).then(el => el.present());
  }


  // ionViewWillEnter(){
  //   this.getAddress();
  // }

  ngOnDestroy() {
    this.addressSub.unsubscribe();

  }

}
