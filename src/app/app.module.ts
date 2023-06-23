import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IonicStorageModule, provideStorage, StorageConfigToken } from '@ionic/storage-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpCustomInterceptorService } from './services/interceptors/http-custom-interceptor.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HammerModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: Storage, useFactory: provideStorage, deps: [StorageConfigToken]},
    { provide: HTTP_INTERCEPTORS, useClass: HttpCustomInterceptorService, multi: true}
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
