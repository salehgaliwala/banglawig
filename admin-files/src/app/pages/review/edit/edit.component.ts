import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../review';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/pages/products/Product.model'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss','../../../../../src/assets/bootstrap.css']
})
export class EditComponent implements OnInit {

  id!: number;
  review!: Review;
  form!: FormGroup;
  Product: Product[] =[];
  productId: any; // Variable to store the selected option
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['reviewId'];
    this.reviewService.find(this.id).subscribe((data) => {
      this.review = data[0];
      this.productId= this.review.productId;
      console.log(this.review.title);
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      productId: new FormControl('', Validators.required)
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
    console.log(this.form.value);
    this.reviewService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log('Review updated successfully!');
      this.router.navigateByUrl('review/index');
    })
  }

}
