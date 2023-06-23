import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { attribute, AttributeNested, Variation } from 'src/app/pages/products/Product.model';
import { VariationService } from 'src/app/shared/services/variations/variation.service';

@Component({
  selector: 'app-variation-form',
  templateUrl: './variation-form.component.html',
  styleUrls: ['./variation-form.component.scss']
})
export class VariationFormComponent implements OnInit {
  @Input() productId: number = 0;
  @Input() productTitle: string = 'p-any';

  @Output() onVariationAdded = new EventEmitter<Variation>();

  attributes: AttributeNested[] = [];
  selectedAttr!: AttributeNested;

  variationList: Variation[] = [];
  variation!: Variation;


  variationForm!: FormGroup;
  variationDetailForm!: FormGroup;
  variationAttrFormArray!: FormArray;

  showForm = false;

  formFields = [
    {
      name: 'productId',
      placeholder: 'productId *',
      label: 'productId',
      type: 'hidden',
      defaultValue: this.productId,
      required: true
    },
    {
      name: 'title',
      placeholder: 'Variation Name *',
      label: 'Title',
      type: 'hidden',
      defaultValue: null,
      required: true
    },
    {
      name: 'VariationAttributes',
      type: 'array',
      children: [{
            name: 'attributeValueId',
            placeholder: 'Attribute Value *',
            label: 'Attribute Value',
            type: 'select',
            defaultValue: null,
            required: false
        }]
    },
    {
      name: 'VariationDetail',
      type: 'group',
      children: [
        {
          name: 'price',
          placeholder: 'Price *',
          label: 'Price',
          type: 'number',
          defaultValue: null,
          required: true
        },
        {
          name: 'stock',
          placeholder: 'stock *',
          label: 'stock',
          type: 'number',
          defaultValue: -1,
          required: true
        },
        {
          name: 'description',
          placeholder: 'Description *',
          label: 'Description',
          type: 'text',
          defaultValue: null,
          required: true
        },
        {
          name: 'featureImage',
          placeholder: 'variation featureImage *',
          label: 'featureImage',
          type: 'image',
          defaultValue: null,
          required: true
        },
      ],
    },
  ]

  constructor(
    private variationService: VariationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log({productIdFromForm: this.productId});
    this.variationForm = this.fb.group({});
    this.variationDetailForm = this.fb.group({});

    this.variationService.fetchNestedAttr().subscribe(attrs => {
      this.attributes = attrs.result.rows;

      this.formInit();
      this.showForm = true;
    });
    
  }

  formInit() {
    this.formFields.map(formItem => {
      if(!formItem.children) {
        this.variationForm.addControl(formItem.name, new FormControl(formItem.defaultValue, {
          updateOn: 'submit',
          validators: [ formItem.required ? Validators.required : Validators.nullValidator ]
        }));
      }

      else if(formItem.children && formItem.type === 'group') {
        formItem.children.map(nestedControls => {
          this.variationDetailForm.addControl(nestedControls.name, new FormControl(nestedControls.defaultValue, {
            // updateOn: 'change',
            validators: [ nestedControls.required ? Validators.required : Validators.nullValidator ]
          }));
        })
        this.variationForm.addControl(formItem.name, this.variationDetailForm);
      }

      else if(formItem.children && formItem.type === 'array') {
        this.variationAttrFormArray = this.createFormArray(this.attributes);
        // if(this.attributes.length > 0) {

        //   this.attributes.map(nestedControls => {
        //     const formArray = this.fb.group({});
        //     formArray.addControl('attributeId', new FormControl(nestedControls.id, {
        //       updateOn: 'submit',
        //       validators: [Validators.required]
        //     }));
        //     formArray.addControl(formItem.children[0].name, new FormControl(formItem.children[0].defaultValue, {
        //       updateOn: 'submit',
        //       validators: [ formItem.children[0].required ? Validators.required : Validators.nullValidator ]
        //     }));
        //     arr.push(formArray)
        //   })

        // }
        this.variationForm.addControl(formItem.name, this.variationAttrFormArray);
      }
    })
  }

  // Create a `FormArray` from the provided array:
  createFormArray(origin: AttributeNested[]) {
    return new FormArray(
      origin.map(
        (item) =>
          new FormGroup({
            attributeId: new FormControl(item.id),
            attributeValueId: new FormControl(null),
          })
      )
    );
  }


  addFormControls(variationForm: FormGroup, formItem: typeof this.formFields[0]){
    variationForm.addControl(formItem.name, new FormControl(formItem.defaultValue, {
      updateOn: 'submit',
      validators: [ formItem.required ? Validators.required : Validators.nullValidator ]
    }));
  }


  onSelectFeatureImage(imageUrl: string) {
    if(this.variationDetailForm.value.featureImage !== imageUrl){
      this.variationDetailForm.patchValue({featureImage: imageUrl});
    }
  }

  get attrFormArray() {
    return this.variationForm.controls["VariationAttributes"] as FormArray;
  }


  addNewVariation() {
    this.variationForm.patchValue({productId: this.productId, title: `${this.productTitle}_${this.variationList.length}`})
    console.log({variationForm: this.variationForm.value});


    // this.variationForm.value.VariationAttributes = this.variationForm.value.VariationAttributes.filter((attr: any) => attr.attributeValueId !== null);

    // this.variationForm.patchValue({VariationAttributes: this.variationForm.value.VariationAttributes.filter((attr: any) => attr.attributeValueId !== null)});

    if(this.variationForm.valid) {
      this.variationService.createAtATime(this.variationForm.value).subscribe(variationRes => {
        console.log({variationRes});
        this.variation = variationRes.result;
        this.variationList.push(variationRes.result);
        this.onVariationAdded.next(variationRes.result);
      })
    }
  }

}
