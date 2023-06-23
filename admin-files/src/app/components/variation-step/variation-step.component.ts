import { Component, Input, OnInit } from '@angular/core';
import { Variation } from 'src/app/pages/products/Product.model';

@Component({
  selector: 'app-variation-step',
  templateUrl: './variation-step.component.html',
  styleUrls: ['./variation-step.component.scss']
})
export class VariationStepComponent implements OnInit {
  @Input() productId: number = 0;
  @Input() productTitle: string = 'p-any';
  @Input() showSectionHeader: boolean = true;
  @Input() sectionHeaderText: string = 'Variation Details';

  variationList: Variation[] = [];
  isVisible = false;

  constructor() {}

  ngOnInit(): void {
    console.log({productId: this.productId})
  }

  handleNewVariation(variation: Variation){
    this.variationList = [...this.variationList, variation];
  }

  showModal(){
    this.isVisible = true;
  }

  closeModal(){
    this.isVisible = false;
  }

}
