import { LoadingController, ModalController } from '@ionic/angular';
import { AddressService } from './../../../services/address/address.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressSingle, Area, Division } from 'src/app/models/address.model';
import { ToastService } from 'src/app/services/controllers/toast.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {

  @Input() defaultValues: AddressSingle;

  divisions: Division[];
  districts: Division[];
  area: Area[];
  isAreaSelected = false;
  areaDisable = true;

  editAddressForm: FormGroup;

  defaultGender = 'female';

  constructor(
    private addressService: AddressService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getDivision();
    this.editAddressForm = new FormGroup({
      name: new FormControl(this.defaultValues.name, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(this.defaultValues.email,{
        updateOn: 'change',
        validators: [Validators.email, Validators.required]
      }),
      phone: new FormControl(this.defaultValues.phone, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(this.defaultValues.address, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      city: new FormControl(this.defaultValues.city, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      area: new FormControl(this.defaultValues.area, {
        updateOn: 'change',
        // validators: [Validators.required]
      }),
      division: new FormControl(this.defaultValues.division, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      additional: new FormControl(this.defaultValues.additional, {
        updateOn: 'change'
      }),
      type: new FormControl(this.defaultValues.type, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      default: new FormControl(this.defaultValues.default, {
        updateOn: 'change'
      })
    });
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  updateProfile() {
    console.log(this.editAddressForm);
    this.loadingCtrl.create({
      message: 'Adding Address...',
      mode: 'ios'
    }).then(el=>el.present());
    this.addressService.updateAddress(this.defaultValues.id, this.editAddressForm.value).subscribe(res=>{
      console.log('updated address : ', res);
      this.loadingCtrl.dismiss();
      if(res.success) {
        this.toastService.toast('address Updated successfully', 'success', 2000);
        this.closeModal();
      } else {
        this.toastService.toast('something went wrong. try again', 'danger', 2000);
      }
    });
  }

  getDivision(){
    this.addressService.getDivision().subscribe(divs=>{
      this.divisions = divs.data;
      console.log('divisions : ', this.divisions);
      const div = this.divisions.find(d=>d.name === this.defaultValues.division);
      this.addressService.getDistrict(div.id).subscribe(dist=>{
        this.districts = dist.data;
        console.log('districts : ', this.districts);
        const city = this.districts.find(d=>d.name === this.defaultValues.city);
        this.addressService.getArea(city.id).subscribe(a=>{
          this.area = a.data;
          console.log('area : ', this.area);
        });
      });
    });
  }
  getDivisionId(id){
    console.log('selected division id : ', id);
  }

  divisionSelected(e) {
    console.log(e);
    const div = this.divisions.find(d=>d.name === e.detail.value);
    console.log(div);

    this.addressService.getDistrict(div.id).subscribe(dist=>{
      this.districts = dist.data;
    });
  }

  citySelected(e) {
    console.log(e);
    const div = this.districts.find(d=>d.name === e.detail.value);
    console.log(div);

    if(this.areaDisable){
      this.isAreaSelected = true;
    } else {
      this.addressService.getArea(div.id).subscribe(dist=>{
        this.area = dist.data;
      });
    }
  }

  areaSelected(e) {
    console.log(e);
    this.isAreaSelected = true;
    const div = this.districts.find(d=>d.name === e.detail.value);
    console.log(div);
  }

}
