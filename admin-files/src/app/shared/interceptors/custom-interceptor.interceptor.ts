import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, finalize, map, Observable, retry, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class CustomInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private nzMessage: NzMessageService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = environment.token;
    // setting header auth
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageService.get('token')}`
      }
    })
    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        // alert(`http error ${req.url}`);
        this.nzMessage.error(error.error.message)
        return throwError(()=> error)
      }),
      map((event: HttpEvent<any>) => {
        
        if(event instanceof HttpResponse) {
          console.log({event})
          event.body.success ? this.nzMessage.success(event.body.message) : this.nzMessage.error(event.body.message)
        }
        return event;
      }),
      finalize(()=>{
        const profilingMsg = `${req.method} "${req.urlWithParams}"`;
        console.log({profilingMsg});
      })
    );
  }
}
