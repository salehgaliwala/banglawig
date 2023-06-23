import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormFields } from 'src/app/components/form-builder/form-builder.model';
import { AttributeService } from '../attribute.service';

@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.scss']
})
export class AddAttributeComponent implements OnInit, OnDestroy {

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

	headerText = 'Add New Attribute For Products: '
	attrSub!: Subscription

	constructor(
		private attributeService: AttributeService,
		private router: Router
	) { }

	ngOnInit(): void { 
		this.attributeInit();
	}

	attributeInit() {
		let attributes = [];
		this.attrSub = this.attributeService.attributes.subscribe(attrs => attributes = [...attrs]);
		if(attributes.length === 0) this.attributeService.fetchAttributesNested().subscribe();
	}

	submit(event: { title: string; description: string; }){
		console.log({event});
		this.attributeService.createAttribute(event).subscribe(() => this.router.navigateByUrl('/pages/attributes'));
	}

	ngOnDestroy(): void {
		this.attrSub.unsubscribe();
	}
}
