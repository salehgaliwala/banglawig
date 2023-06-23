import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFields } from './form-builder.model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Input() submitButtonPosRight: 'center' | 'start' | 'end' | undefined = 'center';
  @Input() submitButtonMaxWidth: number = 300;
  @Input() sectionHeaderText: string | null = null;
  @Input() formFields: FormFields[] = [];
  @Input() updateOn: "change" | "blur" | "submit" | undefined = "change";
  @Input() buttonText: string = "Submit";

  @Output() onSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {

    if(this.formFields.length > 0) {
      this.form = this.fb.group({});
      this.formFields.map(field => {
        this.form.addControl(field.name, new FormControl(field.defaultValue, {
          updateOn: this.updateOn,
          validators: [ field.required ? Validators.required : Validators.nullValidator ]
        }));
      })
    }

  }


  onSelectFeatureImage(imageUrl: string, name: string) {
    this.form.patchValue({[name]: imageUrl});
  }

  submit() {
    if(this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

}
