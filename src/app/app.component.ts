/* eslint-disable max-len */
// import { Component, NgZone } from '@angular/core';
import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AccountService } from './account/account.service';
import { HomepageService } from './services/homepage/homepage.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menus: any;

  constructor(
    private menuCtrl: MenuController,
    private menuService: MenuService,
    private homeService: HomepageService,
    private nav: NavController,
    ) {
      this.initializeApp();
  }

  initializeApp() {
    this.homeService.initHome();

    this.getMenus();
  }

  getMenus(){
    this.menus = this.menuService.fetchMenus();
  }

  openMenu() {
    this.menuCtrl.enable(true, 'custom');
    this.menuCtrl.open('custom');
    console.log('menu clicked');
  }

  closeMenu() {
    this.menuCtrl.close('custom');
  }

  onClickMenu(index) {
    console.log('index : ', index);
    if( this.menus[index].children.length > 0 ) {
      console.log('entered');
      this.menus[index].show = !this.menus[index].show;

    }
    else{
      this.closeMenu();
      this.nav.navigateForward(this.menus[index].route);
    }
  }

  onClickMenuSub(i, si) {
    this.nav.navigateForward(this.menus[i].children[si].route);
  }

  menuIcon(index) {
    if (this.menus[index].children.length > 0 && !this.menus[index].show){ // down
      return 'caret-down';
    }
    if (this.menus[index].children.length > 0 && this.menus[index].show){ // up
      return 'caret-up';
    }
    if (this.menus[index].children.length === 0 && !this.menus[index].show){ // forward
      return 'caret-forward';
    }
  }
}
