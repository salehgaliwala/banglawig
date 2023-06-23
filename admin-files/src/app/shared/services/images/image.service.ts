import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Image, ImageRes, ImageSingleRes } from 'src/app/pages/products/Product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private _images = new BehaviorSubject<Image[]>([])

  constructor(
    private http: HttpClient
  ) { }

  get images() {
    return this._images.asObservable();
  }

  fetch(data: any) {
    return this.http.get<ImageRes>(`${environment.url.base}/uploads`, {params: {...data}}).pipe(
      take(1),
      tap(imagesRes => {
        this._images.next(this._images.value.concat(imagesRes.result.rows));
        return imagesRes;
      })
    )
  }

  create(data: Image) {
    return this.http.post<ImageSingleRes>(`${environment.url.base}/uploads`, {...data}).pipe(
      take(1),
      tap(imagesRes => {
        this._images.next(this._images.value.concat(imagesRes.result));
        return imagesRes;
      })
    )
  }

  delete(id: any){
    return this.http.delete<any>(`${environment.url.base}/uploads/${id}`).pipe(
      take(1),
      tap(imagesRes => {
        // console.log({imagesRes, all: this._images.value});
        // const newImages = this._images.value.filter(img => img.id !== +id);
        // console.log({newImages});
        // this._images.next(newImages);
        return imagesRes;
      })
    )
  }
}
