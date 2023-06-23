import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {RatingModule} from 'primeng/rating';

import { ReviewPageRoutingModule } from './review-routing.module';

import { ReviewPage } from './review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RatingModule,
    ReviewPageRoutingModule
  ],
  declarations: [ReviewPage]
})
export class ReviewPageModule {}
