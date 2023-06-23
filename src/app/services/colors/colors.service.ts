import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  colors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'tertiary',
    'primary-shade',
    'primary-tint',
    'secondary-shade',
    'secondary-tint',
    'success-shade',
    'success-tint',
    'danger-shade',
    'danger-tint',
    'tertiary-shade',
    'tertiary-tint',
  ];

  randomColors = new BehaviorSubject<any[]>([]);

  constructor() { }

  getColors() {
    const color = [];
    this.colors.map(res=>{
      const bg = this.generateNumber();
      color.push(this.colors[bg]);
    });
    this.randomColors.next(color);
    }

  generateNumber() {
    const max = this.colors.length-1;
    const min = 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
