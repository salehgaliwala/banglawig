import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { Category } from '../..//models/category.model';
import { ToastService } from '../../services/controllers/toast.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {
  loadMoreSlug = null;
  loadMoreCounter = 1;
  isLoading = true;
  id: number;
  data=[];
  constructor(private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: ActivatedRoute,
    private toastService: ToastService) { }

  ngOnInit() {
    this.router.params.subscribe(route => {
      this.id = route.id;
      console.log('product_id : ', this.id);
 this.fetchProductByCat(this.id);
      
     

    });
    
  }

  fetchProductByCat(id) {
    console.log('naim', id);
    this.loadMoreSlug = id;
    this.productsService.fetchProductsByCat(id).subscribe((res) => {
      this.isLoading = false;
      this.data = res.result.rows;
    });
  }
}
