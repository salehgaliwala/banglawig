import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/pages/brands/Brand.model';
import { BrandsService } from 'src/app/pages/brands/brands.service';
import { Product } from 'src/app/pages/products/Product.model';
import { ProductService } from 'src/app/pages/products/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() editForm: boolean = false;
  @Input() submitButtonPosRight: boolean = true;
  @Input() showSectionHeader: boolean = true;
  @Input() sectionHeaderText: string = 'Product Details';


  @Output() onCreateProduct = new EventEmitter<Product>();

  productForm!: FormGroup;
  brands: Brand[] = [];

  formFields = [
    {
      name: 'title',
      placeholder: 'Product Name *',
      label: 'Title',
      type: 'text',
      defaultValue: null,
      required: true
    },
    {
      name: 'shortDescription',
      placeholder: 'Product Short Description *',
      label: 'Short Description',
      type: 'text',
      defaultValue: null,
      required: true
    },
    {
      name: 'description',
      placeholder: 'Product Description *',
      label: 'Description',
      type: 'text',
      defaultValue: null,
      required: true
    },
    {
      name: 'price',
      placeholder: 'Product Price *',
      label: 'Price',
      type: 'number',
      defaultValue: null,
      required: true
    },
    {
      name: 'stock',
      placeholder: 'Product stock *',
      label: 'stock',
      type: 'number',
      defaultValue: -1,
      required: true
    },
    {
      name: 'brandId',
      placeholder: 'Select Product Brand *',
      label: 'Brand',
      type: 'select',
      defaultValue: null,
      required: true,
      options: this.brands
    },
    {
      name: 'featureImage',
      placeholder: 'Product featureImage *',
      label: 'featureImage',
      type: 'image',
      defaultValue: null,
      required: true
    },
  ];

  constructor(
    private fb: FormBuilder,
    private brandService: BrandsService,
    private productService: ProductService
  ) {
    this.initBrand();
    this.initForm();
  }

  initBrand() {
    this.brandService.fetch().subscribe(brandRes => {
      this.brands = brandRes.result.rows;
      const index = this.formFields.findIndex(item => item.name === 'brandId');
      this.formFields[index].options = this.brands;
    });
  }

  initForm() {
    this.productForm = this.fb.group({});
    this.formFields.map(field => {
      this.productForm.addControl(field.name, new FormControl(field.defaultValue, {
        updateOn: 'change',
        validators: [ field.required ? Validators.required : Validators.nullValidator ]
      }));
    })
  }

  ngOnInit(): void {
  }

  onSelectFeatureImage(imageUrl: string) {
    console.log({imageUrl});
    this.productForm.patchValue({featureImage: imageUrl});
    console.log({productForm: this.productForm});
  }

  submit(){
    console.log(this.productForm.value);
    this.productService.create(this.productForm.value).subscribe(res => {
      this.onCreateProduct.emit(res.result);
    });
  }

}
