import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  productId;
  rating = 5;

    invalid = false;
  message: string;
  reviewForm = new FormGroup({
    review: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    })
  });

  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  phonenumber;
  loginSection = true;
  otpSection = false;
  successSection = false;

  constructor(
    private router: ActivatedRoute,
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.router.params.subscribe( route =>{
      this.productId = route.productId;
      console.log( 'product_id : ', this.productId);
    });
  }

  onReview(){
    console.log(this.reviewForm);
    this.loadingCtrl.create({
      mode: 'ios',
      message: 'Submitting Review'
    }).then(loadingEl => {
      loadingEl.present();

      if(this.reviewForm.valid) {
        this.loadingCtrl.dismiss();
        console.log({
          success: true,
          review: this.reviewForm.value.review,
          rating: this.rating
        });
        this.nav.navigateForward('/tabs/home');
      } else {
        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
          mode: 'ios',
          color: 'danger',
          position: 'top',
          message: 'something went wrong...',
          duration: 2000
        }).then(toastEl => {
          toastEl.present();
        });
      }
    });

  }

  inputChanged() {
    if(!this.reviewForm.valid) {
      this.invalid = true;
      this.message = 'Invalid phone number. Ex.013xxxxxxxx';
    }
    else{
      this.invalid = false;
      this.message = '';
    }
  }

}
