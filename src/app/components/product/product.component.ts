/* eslint-disable max-len */
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  sizes = [
    {
      desk: 3,
      tab: 6,
      mobile: 12
    }
  ];

  image = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/p960x960/196212923_938037606764749_8713735566665562108_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=7cDGYr4RfeUAX-XeiRq&_nc_ht=scontent.fdac22-1.fna&oh=6736547cb51ace26d76ca4d70c7a05f2&oe=618033C6';
  constructor() { }

  ngOnInit() {}

}
