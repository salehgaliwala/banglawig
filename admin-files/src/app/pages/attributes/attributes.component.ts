import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormFields } from 'src/app/components/form-builder/form-builder.model';
import { AttributeNested } from '../products/Product.model';
import { AttributeService } from './attribute.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit, OnDestroy {
  attributes: AttributeNested[] = [];
  attrSub!: Subscription;

  showAttrValueButton = false;

  addForm = true;
  attributeId!: number;
  showAddAttrValue = false;
  attrValFormFields: FormFields[] = [
    {
			name: 'attributeId',
			placeholder: 'Attribute Id *',
			label: 'AttributeId',
			type: 'number',
			defaultValue: null,
			required: true,
      hidden: true
		},
    {
			name: 'title',
			placeholder: 'Attribute Name *',
			label: 'Title',
			type: 'text',
			defaultValue: null,
			required: true
		},
		{
			name: 'description',
			placeholder: 'Attribute Description *',
			label: 'Description',
			type: 'text',
			defaultValue: null,
			required: true
		}
  ]

  constructor(
    private attributeService: AttributeService
  ) { }

  ngOnInit(): void {
    this.attributeInit();
  }

  attributeInit() {
    this.attrSub = this.attributeService.attributes.subscribe(attrs => {
      const attributes = [...attrs];
      attributes.map(a => a.expand = false);
      this.attributes = [...attributes];
    });
    console.log({attributes: this.attributes.length})
    if(this.attributes.length === 0) this.attributeService.fetchAttributesNested().subscribe();
  }

  openAttributeValueModal(attributeId: number) {
    this.showAddAttrValue = true;
    this.addForm = true;
    const index = this.attrValFormFields.findIndex(item => item.name === 'attributeId');
    this.attrValFormFields[index].defaultValue = attributeId;
  }
  
  addAttrValue(data: {attributeId: number; title: string, description: string}){
    if(this.addForm){
      this.attributeService.createAttributeValue(data).subscribe(() => this.showAddAttrValue = false);
    }else {
      this.attributeService.updateAttributeValue(this.attributeId, data).subscribe(() => this.showAddAttrValue = false);
    }
  }

  openEditAttrValueModal(attributeId: number, attrValueIndex:number){
    this.attributeId = attributeId;
    this.showAddAttrValue = true;
    this.addForm = false;
    const attribute: any = this.attributes.find(item => item.id === attributeId);
    console.log({attributes: this.attributes, attribute, attributeId});
    this.attrValFormFields.map(f => f.defaultValue = attribute.attributeValue[attrValueIndex][f.name] )
  }

  ngOnDestroy(): void {
      this.attrSub.unsubscribe();
  }

}
