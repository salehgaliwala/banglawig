import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, CategoryProductRelation } from 'src/app/pages/category/category.model';
import { CategoryService } from 'src/app/pages/category/category.service';


@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent implements OnInit {
  @Input() productId: number = 0;
  @Input() submitText: string = 'Save Categories';
  @Input() width: number = 80;
  @Input() showSectionHeader: boolean = true;
  @Input() sectionHeaderText: string = 'Select Categories';
  @Output() onAddedCategories = new EventEmitter<boolean>();
  @Output() addingCategories = new EventEmitter<CategoryProductRelation[]>();

  nzOptions: Category[] = [];
  values: number[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.fetchNested().subscribe(catRes => {
      this.nzOptions = this.categoryIterator(catRes.result);
    })
  }

  categoryIterator(categories: Category[]){
    categories.map(cat => {
      if(cat.children && cat.children.length > 0){
        this.categoryIterator(cat.children);
      }
      else {
        cat['isLeaf'] = true;
      }
    })
    return categories;
  }

  sendFormattedData() {
    if(this.values.length > 0) {
      const formattedData = this.formatValueData();
      this.categoryService.createProCatRelBulk(formattedData).subscribe(createProCatRelBulkRes => {
        console.log({createProCatRelBulkRes});
        this.onAddedCategories.emit(true);
        // this.addingCategories.emit(formattedData);
      })
    }
  }

  formatValueData(){
    let formattedData: CategoryProductRelation[] = [];
    this.values?.map(v => {
      const newDatum: CategoryProductRelation = {
        productId: this.productId,
        categoryId: v
      }
      formattedData = [...formattedData, newDatum]
    })
    return formattedData;
  }

}
