import { Subscription } from 'rxjs';
import { Category } from './../models/category.model';
import { HomepageService } from './../services/homepage/homepage.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserverService } from '../services/breakpoint.service';
import { NavController } from '@ionic/angular';
import { Homepage } from '../models/homepage.model';
// import { Device } from '@ionic-native/device/ngx';
// import { ColorsService } from './../services/colors/colors.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  skeleton = [1,2,3,4];
  slideOpts;
  emergencyCatSlider;
  catSlider;
  catSlider2;
  emergencyInfo;
  searchData;
  isLoadingSearch = false;
  mobileView = true;
  showSearch = false;
  phoneCategories: Category[];
  homepage: Homepage[] = [];
  homepageSub: Subscription;
  sliderEl: Homepage = null;
  banner: Homepage = null;
  bannerBg = {
    positionX: 0,
    positionY: 0
  };

  constructor(
    private brkPointService: BreakpointObserverService,
    private homepageService: HomepageService,
    private nav: NavController
  ) { }

  ngOnInit() {
    // this.setColors();
    this.setHomePage();
    this.sizeController();
    this.bannerBgAnimator();
    this.setSliderOptions();
  }
  onClickHomeContent(slug){
    console.log('slug : ', slug);
    if(slug){
      this.nav.navigateForward(slug);
    }
  }
  bannerBgAnimator() {
    setInterval(()=>{
      this.bannerBg.positionX +=0.15;
    },10);
  }
  onSearch(event) {
    console.log('new event created: ', event);
    this.searchData = event;
  }
  isLoading(event) {
    console.log('is loading', event);
    this.isLoadingSearch = event;
  }
  ngOnDestroy() {
    this.homepageSub.unsubscribe();
  }
  // helper methods
  setHomePage() {
    this.homepageService.fetchHomePage().subscribe(res => console.log({res}));
    this.homepageSub = this.homepageService.homepage.subscribe(res => {
      console.log({res});
      this.homepage = res;
    });
  }
  sizeController() {
    this.brkPointService.size.subscribe(size=>{
      console.log('size home : ', size);
      if( size === 'xs' ){
        this.mobileView = true;
      } else{
        this.mobileView = false;
      }
    });
  }
  setSliderOptions() {
      this.slideOpts = {
      grabCursor: true,
      autoplay: true,
      // pagination: {
      //   type: 'bullets',
      //   el: '.swiper-pagination'
      // },
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 10,
        shadowScale: 0.64,
      },
      on: {
        beforeInit: function() {
          const swiper = this;
          swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

          const overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: false,
            virtualTranslate: true,
          };

          this.params = Object.assign(this.params, overwriteParams);
          this.originalParams = Object.assign(this.originalParams, overwriteParams);
        },
        setTranslate: function() {
          const swiper = this;
          const {
            $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
          } = swiper;
          const params = swiper.params.cubeEffect;
          const isHorizontal = swiper.isHorizontal();
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
          let wrapperRotate = 0;
          let $cubeShadowEl;
          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                $wrapperEl.append($cubeShadowEl);
              }
              $cubeShadowEl.css({ height: `${swiperWidth}px` });
            } else {
              $cubeShadowEl = $el.find('.swiper-cube-shadow');
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                $el.append($cubeShadowEl);
              }
            }
          }

          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = slides.eq(i);
            let slideIndex = i;
            if (isVirtual) {
              slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
            }
            let slideAngle = slideIndex * 90;
            let round = Math.floor(slideAngle / 360);
            if (rtl) {
              slideAngle = -slideAngle;
              round = Math.floor(-slideAngle / 360);
            }
            const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
            let tx = 0;
            let ty = 0;
            let tz = 0;
            if (slideIndex % 4 === 0) {
              tx = -round * 4 * swiperSize;
              tz = 0;
            } else if ((slideIndex - 1) % 4 === 0) {
              tx = 0;
              tz = -round * 4 * swiperSize;
            } else if ((slideIndex - 2) % 4 === 0) {
              tx = swiperSize + (round * 4 * swiperSize);
              tz = swiperSize;
            } else if ((slideIndex - 3) % 4 === 0) {
              tx = -swiperSize;
              tz = (3 * swiperSize) + (swiperSize * 4 * round);
            }
            if (rtl) {
              tx = -tx;
            }

            if (!isHorizontal) {
              ty = tx;
              tx = 0;
            }

            const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
            if (progress <= 1 && progress > -1) {
              wrapperRotate = (slideIndex * 90) + (progress * 90);
              if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
            }
            $slideEl.transform(transform$$1);
            if (params.slideShadows) {
              // Set shadows
              let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
              let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
              if (shadowBefore.length === 0) {
                shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
                $slideEl.append(shadowBefore);
              }
              if (shadowAfter.length === 0) {
                shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
                $slideEl.append(shadowAfter);
              }
              if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
              if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
            }
          }
          $wrapperEl.css({
            '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
            '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
            '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
            'transform-origin': `50% 50% -${swiperSize / 2}px`,
          });

          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
            } else {
              const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
              const multiplier = 1.5 - (
                (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
                + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
              );
              const scale1 = params.shadowScale;
              const scale2 = params.shadowScale / multiplier;
              const offset$$1 = params.shadowOffset;
              $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
            }
          }

          const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
          $wrapperEl
            .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
        },
        setTransition: function(duration) {
          const swiper = this;
          const { $el, slides } = swiper;
          slides
            .transition(duration)
            .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
            .transition(duration);
          if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
            $el.find('.swiper-cube-shadow').transition(duration);
          }
        },
      }
    };

    this.emergencyCatSlider = {
      initialSlide: 0,
      speed: 400,
      loop: true,
      slidesPerView: 2.2,
      spaceBetween: 1,
      autoplay: true,
      breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1.5,
            spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1.7,
            spaceBetween: 10
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 2.5,
            spaceBetween: 10
          },
          // when window width is >= 640px
          980: {
            slidesPerView: 3.9,
            spaceBetween: 10
          }
        }
    };

    this.catSlider = {
      initialSlide: 0,
      speed: 400,
      loop: true,
      slidesPerView: 4.9,
      spaceBetween: 1,
      autoplay: true,
      breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 2.7,
            spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2.7,
            spaceBetween: 30
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 4.9,
            spaceBetween: 30
          },
          // when window width is >= 640px
          980: {
            slidesPerView: 5.9,
            spaceBetween: 30
          }
      }
    };

    this.catSlider2 = {
      initialSlide: 0,
      speed: 400,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      autoplay: true,
      breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 1.9,
            spaceBetween: 40
          },
          // when window width is >= 640px
          980: {
            slidesPerView: 1.9,
            spaceBetween: 40
          }
      }
    };
  }
  // setColors() {
  //   this.colorsService.getColors();
  //   this.colorsService.randomColors.subscribe(res=>{
  //     this.colors = res;
  //   });
  //   console.log(this.colors);
  // }
}
