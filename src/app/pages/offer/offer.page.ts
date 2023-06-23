import { BreakpointObserverService } from 'src/app/services/breakpoint.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  showSearch = false;
  isLoadingSearch = false;
  searchData;
  isMobile = true;

  constructor(
    private brkPointObsService: BreakpointObserverService
  ) { }

  ngOnInit() {
    this.brkPointObsService.size.subscribe(size => {
      if(size === 'xs'){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  isLoading(event) {
    console.log('is loading', event);
    this.isLoadingSearch = event;
  }

  onSearch(event) {
    console.log('new event created: ', event);
    this.searchData = event;
  }

}
