import { Component, OnInit } from '@angular/core';
import { Product } from '../Product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product!: Product;
  currentStep = 0;

  constructor() { }

  ngOnInit(): void {
  }

  nextStep(){
    this.currentStep += 1;
  }

  prevStep(){
    this.currentStep -= 1;
  }

  getProductDetails(product: Product) {
    console.log({product});
    this.product = product;
    if(this.product){
      this.nextStep();
    }
  }

  addNewProductStep(){
    this.currentStep = 0;
  }

  categoriesAdded(event: boolean){
    if(event) {
      this.nextStep();
    }
  }

}
