/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Review } from './reviews.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {

  rating = 5;

  reviews: Review[];

  constructor() { }

  ngOnInit() {
    this.reviews = [
      {
        id: '1',
        user_name: 'Ovi',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
      {
        id: '2',
        user_name: 'Supriya',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
      {
        id: '3',
        user_name: 'naim',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
      {
        id: '4',
        user_name: 'oishe',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
      {
        id: '5',
        user_name: 'rasel',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
    ];
  }

}
