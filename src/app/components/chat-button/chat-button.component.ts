import { LoadingController, Platform } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss'],
})
export class ChatButtonComponent implements OnInit {
  @Input() style;
  @Input() open: boolean;

  constructor(
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private inAppBrowser: InAppBrowser
  ) { }

  ngOnInit() {
    console.log("open", this.open);
    if(this.open) {
      console.log('open chat');
      this.openAppUrl('facebook', '110577424576527', '100069079130120');
    }
  }

        //fb page
  openAppUrl(app: string, name: string, id?: string) {
    this.loadingCtrl.create({
      message: 'Opening Chat',
      duration: 3000
    }).then(el=>el.present());
    switch (app) {
        case 'facebook':
            this.launchApp(
              'fb://', 'com.facebook.orca',
              'http://m.me/' + name,
              'http://m.me/' + name,
              'https://m.me/' + name);
            break;
        case 'instagram':
            this.launchApp(
              'instagram://',
              'com.instagram.android',
              'instagram://user?username=' + name,
              'instagram://user?username=' + name,
              'https://www.instagram.com/' + name);
            break;
        case 'twitter':
            this.launchApp(
              'twitter://', 'com.twitter.android',
              'twitter://user?screen_name=' + name,
              'twitter://user?screen_name=' + name,
              'https://twitter.com/' + name);
            break;
        default:
            break;
      }
  }
  launchApp(iosApp: string, androidApp: string, appUrlIOS: string, appUrlAndroid: string, webUrl: string) {
    let app: string;
    let appUrl: string;
    // check if the platform is ios or android, else open the web url
    if (this.platform.is('ios')) {
      app = iosApp;
      appUrl = appUrlIOS;
      const browser: InAppBrowserObject = this.inAppBrowser.create(appUrl, '_system');
    } else if (this.platform.is('android')) {
      app = androidApp;
      appUrl = appUrlAndroid;
      const browser: InAppBrowserObject = this.inAppBrowser.create(appUrl, '_system');
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create(webUrl, '_system');
      return;
    }

    // this.appAvailability.check(app).then(
    //     () => {
    //         // success callback, the app exists and we can open it
    //         const browser: InAppBrowserObject = this.inAppBrowser.create(appUrl, '_system');
    //     },
    //     () => {
    //         // error callback, the app does not exist, open regular web url instead
    //         const browser: InAppBrowserObject = this.inAppBrowser.create(webUrl, '_system');
    //     }
    // );
  }

}
