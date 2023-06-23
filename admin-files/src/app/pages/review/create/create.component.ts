import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Product} from 'src/app/pages/products/Product.model'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss', '../../../../../src/assets/bootstrap.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
 
  Product: Product[] = [];
  /*--------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public reviewService: ReviewService,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      productId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.reviewService.getAllProducts().subscribe((data) => {
      this.Product = data;
      console.log(this.Product);
    })
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
   
  
    this.reviewService.create(this.form.value).subscribe((res: any) => {
      console.log('Review created successfully!');
      this.router.navigateByUrl('review/index');
    })
  }


  

}