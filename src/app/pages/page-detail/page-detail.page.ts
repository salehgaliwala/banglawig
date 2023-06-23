import { Subscription } from 'rxjs';
import { PageRes } from './../../models/page.model';
import { PageService } from './../../services/page.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.page.html',
  styleUrls: ['./page-detail.page.scss'],
})
export class PageDetailPage implements OnInit, OnDestroy {

  pageRes!: PageRes;
  isPageAvailable = false;

  pageSub: Subscription;


  constructor(
    private router: ActivatedRoute,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(route=>{
      this.loadContent(route.slug);
    });

  }

  // content loading method
  loadContent(slug) {
    this.pageService.fetchPage(slug).subscribe((data)=>{
      console.log('fetch : ', data);
      this.isPageAvailable = true;
    });
    this.pageSub = this.pageService.page.subscribe(data=>{
      this.pageRes = data;
      console.log('page-detail : ',this.pageRes);
    });


  }

  ngOnDestroy() {
    this.pageSub.unsubscribe();
  }

}
