import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserverService } from '../services/breakpoint.service';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  showTabTitle = true;
  desktop = false;
  searchShow = false;
  isLoading = false;
  searchResultData: Product[] = [];
  showMegaMenu: boolean = false;
  menuData :any[];
  searchResult = {
    height: 400,
    display: 'block',
    overflow: 'scroll'
  };
  constructor(
    private brkPointObs: BreakpointObserverService,
    private productsService: ProductsService,
    private http: HttpClient
  ) { }
  ngOnInit() {
    this.getSize();
    
    this.getMenuData().subscribe(data => {
      this.menuData = data;
    });
  }

  getSize() {
    this.brkPointObs.size.subscribe(data=>{
      console.log('size : ', data);
      if( data === 'xl' || data === 'lg' ) {
        this.desktop = true;
      } else {
        this.desktop  = false;
      }
    });
  }

  onSearch(event) {
    console.log('search product : ', event.detail.value);
    if ( event.detail.value === '' || event.detail.value.length < 2) {
      this.searchShow = false;
      this.isLoading = false;
    }
    else {
        this.isLoading = true;
        console.log('products');
        this.productsService.fetchProductsBySearch(event.detail.value).subscribe(res=>{
          console.log('data from search : ', res.result.rows);
          this.searchShow = true;
          this.isLoading = false;
          this.searchResultData = res.result.rows;
        });
    }
  }

  toggleMegaMenu() {
    this.showMegaMenu = !this.showMegaMenu;
  }

  onKeyInput(event){
      this.isLoading = true;
      this.searchShow = false;
  }

  getMenuData(): Observable<any[]> {
    // Simulated menu data
    const url = `${environment.url.main}/utilities/getallmenu`;
    const menuData = this.http.get<any>(url);

    

    return menuData;
  }
 
}
