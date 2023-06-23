import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { IonicModule } from '@ionic/angular';
import { RatingModule } from 'primeng/rating';



@NgModule({
  declarations: [
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RatingModule
  ],
  exports: [
    ReviewsComponent
  ]
})
export class ReviewsModule { }
