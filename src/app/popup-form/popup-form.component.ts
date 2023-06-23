import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDetailPage } from 'src/app/products/product-detail/product-detail.page';
@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss']
})
export class PopupFormComponent { 
  formData: any = {}; // Store form data here
  showPopup = false;
  fname: string;
  lname: string;
  username: string;
  phone: string;  
  email: string;
  message: string;
  age: string='';
  bname: string;
  blicense: string;
  country: string = 'Bangladesh';
  brole: string;
  isFormSubmitted: boolean = false;
  constructor(private http: HttpClient, private productDetail: ProductDetailPage) { 

  }

  submitForm() {
    // Handle form submission logic here
    // You can access form data through this.formData object
    // Example: this.http.post('/api/submit', this.formData).subscribe(...);
      const formData = {
      fname: this.fname,
      lname: this.lname,
      username: this.username,
      phone: this.phone,
      email: this.email,
      message: this.message,
      age: this.age,
      bname: this.bname,
      blicense: this.blicense,
      country: this.country,
      brole: this.brole,
    };
    if (formData.fname == '' || formData.lname == '')
    {
      this.isFormSubmitted = false;
      return;
    }
    this.http.post('http://localhost:8888/api/v1/utilities/sendmail', formData).subscribe(
      response => {
        this.isFormSubmitted = true;
        this.productDetail.closePopup();
      },
      error => {
        this.isFormSubmitted = false;
        console.error('Error sending email:', error);
      }
    );
     // Close the popup after submission
  }    

  
  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    // Reset form data and close the popup
    console.log(this.showPopup);
    this.formData = {};
    this.productDetail.closePopup();
  }
}
