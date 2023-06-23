import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiURL = `${environment.url.base}/utilities`;

  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/reviews/')

      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllProducts(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/getallproducts')

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  create(review: Review): Observable<any> {
    console.log(JSON.stringify(review));
    return this.httpClient.post(this.apiURL + '/create-reviews/', JSON.stringify(review), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id: number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/reviewsupdate/' + id)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id: number, review: Review): Observable<any> {

    return this.httpClient.put(this.apiURL + '/reviewsupdatedata/' + id, JSON.stringify(review), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id: number) {
    return this.httpClient.delete(this.apiURL + '/reviewsdelete/' + id, this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /** 
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
