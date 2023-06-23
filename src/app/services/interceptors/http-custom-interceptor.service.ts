/* eslint-disable @typescript-eslint/naming-convention */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, retry } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCustomInterceptorService implements HttpInterceptor {

  constructor(
    private storageService: StorageService,
    private toastCtrl: ToastController,
    private accountService: AccountService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.accountService.userToken;
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(req).pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          this.toastCtrl.create({
            color: 'danger',
            message: error.error.message
          });
          return throwError(()=> error);
        }),
        map((event: HttpEvent<any>)=> {
          if(event instanceof HttpResponse) {
            if(!event.body.success) {
              this.toastCtrl.create({
                color: 'danger',
                message: event.body.message
              });
            }
          }
          return event;
        }),
        finalize(()=> {
          const profilingMsg = `${req.method} ${req.urlWithParams}`;
          console.log({profilingMsg});
        })
      );
  }
}
