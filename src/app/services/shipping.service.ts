import { Injectable } from '@angular/core';
import { ShippingArea } from '../models/shipping.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  //area: ShippingArea[];

  constructor() { }

  getArea() {
    return [
        {name: 'Dhaka Metro', code: 'AU', cost: '60'},
        {name: 'Narayanganj', code: 'BR', cost: '100'},
        {name: 'Keraniganj', code: 'CN', cost: '100'},
        {name: 'Savar', code: 'EG', cost: '100'},
        {name: 'Madaripur', code: 'FR', cost: '120'},
        {name: 'Meherpur', code: 'DE', cost: '120'},
        {name: 'Sylhet', code: 'IN', cost: '120'},
        {name: 'Rajshahi', code: 'JP', cost: '120'}
    ];
  }


}
