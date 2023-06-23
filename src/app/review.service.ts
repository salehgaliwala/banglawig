import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
 
  constructor(private http: HttpClient) { }
  getReviews(productId: number): Observable<any> {
    const url = `${environment.url.main}/utilities/reviews/${productId}`;
    return this.http.get<any>(url);
  }

  getReviewsImages(reviewId: number): Observable<any> {
    const url = `${environment.url.main}/utilities/reviews/${reviewId}/images`;
    return this.http.get<any>(url);
  }

}
