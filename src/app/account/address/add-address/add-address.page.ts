import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Area, Division } from './../../../models/address.model';
import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address/address.service';
import { ToastService } from 'src/app/services/controllers/toast.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit, OnDestroy {
  @Input() fromModal;
  addressForm: FormGroup;
  divisions: Division[];
  districts: Division[];
  area: Area[];
  areaDisable = true;
  isAreaSelected = false;

  defaultGender = 'female';

  referrerSub: Subscription;
  referrer = null;

  validScheme = {
    name: true,
    email: true,
    phone: true,
    division: true,
    city: true,
    area: true,
    address: true
  };

  constructor(
    private addressService: AddressService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.areaDisable = this.addressService.areaDisable;
    this.referrerInit();
    this.getDivision();
    this.addressForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null,{
        updateOn: 'change',
        validators: [Validators.email, Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      area: new FormControl(null, {
        updateOn: 'change',
        // validators: [Validators.required]
      }),
      division: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      additional: new FormControl(null, {
        updateOn: 'change'
      }),
      type: new FormControl('Home', {
        updateOn: 'change',
      }),
      default: new FormControl(true, {
        updateOn: 'change'
      })
    });
  }

  referrerInit() {
    this.referrerSub = this.authService.referrer.subscribe(ref=>{
      this.referrer = ref;
      console.log('referrer : ', this.referrer);
    });
  }

  changeAddress(event, id) {
    console.log('area edited',event.detail.value);
    console.log('area edited',id);
    if(id === 'area'){
      console.log('area edited',event.detail.value);
      if(event.detail.value === null || event.detail.value === undefined){
        console.log('found unselect');
      }
    }
  }

  // formChanges() {
  //   console.log('clicked');
  //   this.validatorSchema(this.addressForm).then();
  // }

  updateProfile() {
    console.log(this.addressForm.value);

     this.addressForm.value.default = this.addressForm.value.default ? 1 : 0;
    //  this.validatorSchema(this.addressForm).then(valid=>{
    //    if(valid){
        console.log('added address : ', this.addressForm.value);
        this.loadingCtrl.create({
          message: 'Adding Address...',
          mode: 'ios'
        }).then(el=>el.present());

        this.addressService.addAddress(this.addressForm.value).subscribe(res=>{
          console.log('added address : ', res);
          this.loadingCtrl.dismiss();
          if(this.fromModal !== undefined || this.fromModal) {
            this.modalCtrl.dismiss({closed: true});
          }
          if(res.success) {
            this.toastService.toast('address added successfully', 'success', 2000);
            if(this.referrer){
              this.nav.navigateForward(this.referrer);
            }

          } else {
            this.toastService.toast('something went wrong. try again', 'danger', 2000);
          }
        });
  }

  validatorSchema(form){
    return new Promise(resolve=>{
      if(!form.valid){
        if(form.controls.name.status === 'INVALID'){
          this.validScheme.name = false;
        } else {
          this.validScheme.name = true;
        }
        if(form.controls.email.status === 'INVALID'){
          this.validScheme.email = false;
        } else {
          this.validScheme.email = true;
        }
        if(form.controls.phone.status === 'INVALID'){
          this.validScheme.phone = false;
        } else {
          this.validScheme.phone = true;
        }
        if(form.controls.division.status === 'INVALID'){
          this.validScheme.division = false;
        } else {
          this.validScheme.division = true;
        }
        if(form.controls.city.status === 'INVALID'){
          this.validScheme.city = false;
        } else {
          this.validScheme.city = true;
        }
        if(form.controls.area.status === 'INVALID'){
          this.validScheme.area = false;
        } else {
          this.validScheme.area = true;
        }
        if(form.controls.address.status === 'INVALID'){
          this.validScheme.address = false;
        } else {
          this.validScheme.address = true;
        }
        resolve(false);
      } else{
        resolve(true);
      }
    });
  }

  getDivision(){
    this.addressService.getDivision().subscribe(divs=>{
      this.divisions = divs.data;
    });
  }
  getDivisionId(id){
    console.log('selected division id : ', id);
  }

  divisionSelected(e) {
    console.log(e);
    const div = this.divisions.find(d=>d.name === e.detail.value);
    console.log(div);
    console.log('division : ', this.addressForm.value.division);

    this.addressForm.patchValue({area: null, city: null});
    this.isAreaSelected = false;

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
    }
    else {
      this.addressForm.patchValue({area: null});
      this.isAreaSelected = false;

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
    console.log('area : ', this.addressForm.value.area);
  }
  areaBlur(event) {
    console.log('area blur : ', this.addressForm.value.area);
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy(){
    this.referrerSub.unsubscribe();
  }


}
