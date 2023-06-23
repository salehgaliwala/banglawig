import { ChatButtonModule } from './../../components/chat-button/chat-button.module';
import { PipesModule } from './../../pipes/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {RatingModule} from 'primeng/rating';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';
import { ProductDetailPage } from './product-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { TextBannerModalModule } from 'src/app/components/text-banner-modal/text-banner-modal.module';
import { MainHeaderModule } from 'src/app/components/main-header/main-header.module';
import { PopupFormComponent } from 'src/app/popup-form/popup-form.component';
import { ReviewsComponent } from 'src/app/components/reviews/reviews.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingModule,
    ComponentsModule,
    HttpClientModule,
    PipesModule,
    ChatButtonModule,
    NgOtpInputModule,
    TextBannerModalModule,
    ReactiveFormsModule,
    MainHeaderModule,
    ProductDetailPageRoutingModule,
    
  ],
  declarations: [ProductDetailPage, PopupFormComponent, ReviewsComponent]
})
export class ProductDetailPageModule {}
