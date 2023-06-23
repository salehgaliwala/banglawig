import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormFields } from 'src/app/components/form-builder/form-builder.model';
import { AttributeNested } from '../../products/Product.model';
import { AttributeService } from '../attribute.service';

@Component({
  selector: 'app-edit-attribute',
  templateUrl: './edit-attribute.component.html',
  styleUrls: ['./edit-attribute.component.scss']
})
export class EditAttributeComponent implements OnInit {

	formFields: FormFields[] = [
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
	];

	headerText = 'Edit Attribute : '
	attrSub!: Subscription;
  id!: number;

	constructor(
		private attributeService: AttributeService,
		private router: Router,
    private activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params => this.id = +params['id'])
		this.attributeInit();
	}

	attributeInit() {
		let attributes = [];
    let attribute: any;
		this.attrSub = this.attributeService.attributes.subscribe(attrs => {
      attributes = [...attrs]
      attribute = attributes.find(a => a.id === this.id);
      if(attribute){
        this.formFields.map(f => {
          f.defaultValue = attribute[f.name];
          console.log({attribute: attribute[f.name]})
        })
      }
      console.log({id: this.id, form: this.formFields})
    });
		if(attributes.length === 0) this.attributeService.fetchAttributesNested().subscribe();
	}

	submit(event: { title: string; description: string; }){
		console.log({event, id: this.id});
		this.attributeService.updateAttribute(this.id, event).subscribe(() => this.router.navigateByUrl('/pages/attributes'));
	}

	ngOnDestroy(): void {
		this.attrSub.unsubscribe();
	}
}
