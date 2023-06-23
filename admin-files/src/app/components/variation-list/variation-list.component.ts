import { Component, Input, OnInit } from '@angular/core';
import { Variation } from 'src/app/pages/products/Product.model';

@Component({
  selector: 'app-variation-list',
  templateUrl: './variation-list.component.html',
  styleUrls: ['./variation-list.component.scss']
})
export class VariationListComponent implements OnInit {
  @Input() variationList: Variation[] = [
    {
      "id": 18,
      "productId": 31,
      "title": "variations three",
      "createdAt": "2022-07-12T10:35:32.000Z",
      "updatedAt": "2022-07-12T10:35:32.000Z",
      "VariationAttributes": [
          {
              "id": 20,
              "attributeId": 2,
              "attributeValueId": 6,
              "attributeValue": {
                  "id": 6,
                  "title": "30\""
              },
              "attribute": {
                  "id": 2,
                  "title": "length",
                  "description": "length of hair"
              }
          },
          {
              "id": 21,
              "attributeId": 1,
              "attributeValueId": 2,
              "attributeValue": {
                  "id": 2,
                  "title": "white"
              },
              "attribute": {
                  "id": 1,
                  "title": "color",
                  "description": "Hair colors attributes "
              }
          }
      ],
      "VariationDetail": {
          "id": 9,
          "price": 1000,
          "stock": -1,
          "description": "<p>variation one desc</p>",
          "featureImage": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320"
      }
  }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
