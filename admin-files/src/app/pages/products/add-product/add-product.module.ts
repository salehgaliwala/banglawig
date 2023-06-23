import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { ImageUploaderModule } from 'src/app/components/image-uploader/image-uploader.module';
import { ProductFormModule } from 'src/app/components/product-form/product-form.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { VariationFormModule } from 'src/app/components/variation-form/variation-form.module';
import { VariationStepModule } from 'src/app/components/variation-step/variation-step.module';
import { NzResultModule } from 'ng-zorro-antd/result';
import { ChooseCategoryModule } from 'src/app/components/choose-category/choose-category.module';

@NgModule({
  declarations: [
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ImageUploaderModule,
    ProductFormModule,
    NzStepsModule,
    NzDividerModule,
    NzButtonModule,
    NzResultModule,
    VariationStepModule,
    ChooseCategoryModule,
    AddProductRoutingModule
  ]
})
export class AddProductModule { }
