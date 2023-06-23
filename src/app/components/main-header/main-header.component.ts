import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { BreakpointObserverService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  searchData: Product[] = [];
  isLoadingSearch = false;
  mobileView = true;
  showSearch = false;

  constructor(private brkPointService: BreakpointObserverService,) { }

  ngOnInit() {
    this.brkPointService.size.subscribe(size=>{
      console.log('size home : ', size);
      if( size === 'xs' ){
        this.mobileView = true;
      } else{
        this.mobileView = false;
      }
    });
  }

  onSearch(event) {
    console.log('new event created: ', event);
    this.searchData = event;
  }
  isLoading(event) {
    console.log('is loading', event);
    this.isLoadingSearch = event;
  }

}
