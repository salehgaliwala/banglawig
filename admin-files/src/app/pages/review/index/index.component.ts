import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Review } from '../review';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss', '../../../../../src/assets/bootstrap.css']
})
export class IndexComponent implements OnInit {

  reviews: Review[] = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public reviewService: ReviewService) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.reviewService.getAll().subscribe((data: Review[]) => {
      this.reviews = data;
      console.log(this.reviews);
    })
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteReview(id: number) {
    this.reviewService.delete(id).subscribe(res => {
      this.reviews = this.reviews.filter(item => item.id !== id);
      console.log('Review deleted successfully!');
    })
  }

}
