/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Subscription } from 'rxjs';
import { Product, SingleProductRes } from '../../models/product.model';

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonContent, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Variation } from 'src/app/models/variations.model';
import { ToastService } from 'src/app/services/controllers/toast.service';
import { ReviewService } from 'src/app/review.service';

import { IonSlides } from '@ionic/angular'
interface Div {
  id: number;
  title: string;
  highlighted: boolean;
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})

export class ProductDetailPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('slider') slider: IonSlides;
  authSub: Subscription;
  cartSub: Subscription;

  isLoggedIn = false;
  product_slug: string;
  animator: any;
  animatorDuration = 800;
  totalCartQty = 0;
  
  singleProduct: Product;
  singleProductRes: SingleProductRes;
  allowedAttributes: any[] = [];
  allowedAttributesimages :any[] = [];

  selectedVariation: Variation;
  selectedImageId: number;

  attributeSelectForm: FormGroup;

  segment = 'description';
  newReviewsArr = [];
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 300,
    autoplay: true,
    zoom: true
  };
  thumbnailOptions = {
    spaceBetween: 10,
    slidesPerView: 5,
    centeredSlides: false,
    loop: false,
    loopAdditionalSlides: 2,
  };
  divs: Div[] = [];
  geodata: any;
  showPopup = false;
  reviewData: any;
  constructor(
    private animationCtrl: AnimationController,
    private nav: NavController,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private authService: AuthService,
    private toastService: ToastService,
    private reviewService: ReviewService
    ) { 
   
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      console.log('activated route : ', data.slug);
      this.product_slug = data.slug;
      this.getSingleProduct(data.slug);
      this.productsService.geodata().subscribe(res => {
        this.geodata = res;
      });
    });
    this.cartInit();

    this.authSub = this.authService.loggedIn.subscribe(res => this.isLoggedIn = res);
    ;
  }

  cartInit() {
    this.cartService.fetchCartObj().subscribe();
    this.cartSub = this.cartService.cartObj.subscribe(cartRes => {
      if(cartRes){
        this.totalCartQty = cartRes.result ? cartRes.result.cartItems.reduce((total, currentItem)=>total+currentItem.quantity,0) : 0;
      }
    });
  }

  ngAfterViewInit(){
    // scroll to top
      this.scrollToTop(900);
      console.log('after view init');
  }

  getMainImage(){
    return this.selectedVariation ? this.selectedVariation.VariationDetail.featureImage : this.singleProduct.featureImage;
  }


  getSingleProduct(product_slug) {
    this.productsService.fetchProductBySlug(product_slug).subscribe( singleProductRes => {
      this.singleProductRes = singleProductRes;
      this.singleProduct = this.singleProductRes.result;
      this.allowedAttributes = this.retrieveVarAttrs();
      this.allowedAttributesimages = this.allowedAttributes.filter(t => t.id === 13);
      this.allowedAttributes = this.allowedAttributes.filter(t => t.id!= 13);
      this.selectedVariation = this.singleProduct.Variations[0];

        this.attributeSelectForm = new FormGroup({});
        this.allowedAttributes.map((attr, attrIndex )=> {
          this.attributeSelectForm.addControl(
            `${this.selectedVariation.VariationAttributes[attrIndex].attributeId}`,
            new FormControl()
          );
        });
      console.log(this.allowedAttributesimages);
      this.divs = this.allowedAttributesimages[0].value.map((obj,index) => ({
        id: obj.id,
        title: obj.title,
        highlighted: false
      }))
      this.loadReviews(this.singleProduct.id)

    });
  }
  selectImage(imageId: number) {
    this.selectedImageId = imageId;
  }

  getVariationId() {
    const variation = this.getVariation();
    this.selectedVariation = variation;
    if(!variation) {
      this.toastService.toast('No products available with the selected options right now', 'danger');
      return null;
    }
    console.log({selectedVariation: this.selectedVariation});
    return variation.id;
  }

  submited(){
    console.log({form: this.attributeSelectForm.value});
    this.getVariationId();
  }

  getVariation(): Variation|null{
    let attrs = [];
    for(const [attributeId, attributeValueId] of Object.entries(this.attributeSelectForm.value)) {
      attrs = [...attrs, { attributeId, attributeValueId}];
    }
    console.log({attrs});

    const newArr = [];
    this.singleProduct.Variations.map((variation, index) => {
      variation.VariationAttributes.map(varAttr => {
        attrs.map(allowedAttr => {
          if(+allowedAttr.attributeId === varAttr.attributeId && allowedAttr.attributeValueId === varAttr.attributeValueId){
            newArr.push(index);
            console.log({newArr});
          }
        });
      });
    });
    // const indexOfVariation = newArr.filter((item, index) => newArr.indexOf(item) !== index);
    // console.log({variationI: this.singleProduct.Variations[indexOfVariation[0]]});
    // console.log({getMaxOccurance: this.getMaxOccurance(newArr)});
    const variationIndex = this.getMaxOccurance(newArr);
    return this.singleProduct.Variations[variationIndex] ? this.singleProduct.Variations[variationIndex] : null;
  }

  getMaxOccurance(givenArray=[]){
    const maxValue = givenArray.reduce((previous, current, i, arr) =>
      arr.filter(item => item === previous).length >
      arr.filter(item => item === current).length
        ? previous
        : current
    );

    console.log(`Maximum occurrence value : ${maxValue}`);
    return maxValue;
  }


  /**
   * controls all activity on cart product clicking add to cart button
   * start animation
   * play animation
   * increase cart quantity on completing the animation
   *
   * @since 1.0.0
   *
   * return void
   */
  addToCart(): void {
    this.animation();
    this.animator.play();

    if( this.isLoggedIn ) {
      this.cartAdder();
    } else {
      // TODO: redirect to accountpage
      this.nav.navigateForward('tabs/carts');
    }
  }

  buyNow() {
    if( this.isLoggedIn ) {
      this.cartAdder();
      this.nav.navigateForward('tabs/carts');
    } else {
      // TODO: redirect to accountPage
    }
  }

  retrieveVarAttrs(){
    const product = this.singleProduct;
    const variationAttrs = [];
    const attributes = [];
    product.Variations.map(variation => {
      // variationAttrs.push(variation.VariationAttributes);
      variation.VariationAttributes.map(varAttr => {
        const matched = attributes.findIndex(attr => attr.id === varAttr.attributeId);
        if(matched === -1) { // no mathcing attribute present;
          const newAttr = {
            id: varAttr.attributeId,
            title: varAttr.attribute.title,
            description: varAttr.attribute.description,
            value: [{
              id: varAttr.attributeValueId,
              title: varAttr.attributeValue.title
            }]
          };
          attributes.push(newAttr);
        }
        else { // matching attr present add new value
          const matchedAttr = attributes[matched].value.findIndex(val => val.id === varAttr.attributeValueId);
          if(matchedAttr === -1) {
            attributes[matched].value.push({
              id: varAttr.attributeValueId,
              title: varAttr.attributeValue.title
            });
          }
        }
      });
    });
    console.log({attributes});
    return attributes;
  }

  retriveAttr() {
    let attributes = [{id: 0}];
    const variationAttrs = this.retrieveVarAttrs();
    console.log({variationAttrs});
    variationAttrs.map(varAttr => {
      const matched = attributes.findIndex(attr => attr.id === varAttr.attribute.id);
      if(matched === -1) {
        attributes = [...attributes, varAttr.attribute];
      }
    });

    return {attributes, variationAttrs};
  }

  retrieveAttrValues() {
    const {attributes, variationAttrs} = this.retriveAttr();
    const attrWithValues = [];
    attributes.map(attr => {
      const newVar = variationAttrs.filter(varAttr => varAttr.attributeId === attr.id);
      attrWithValues.push(newVar);
    });
    console.log(attrWithValues);
  }



  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.authSub.unsubscribe();
  }


  // less impo
/**
 * observe segment change event and scroll to a point
 *
 * @param event
 * @return void
 */
    segmentChanged(event): void {
    console.log(event.target.value);
    if(event.target.value) {
      this.segment = event.target.value;
      this.content.scrollToPoint(200, 300, 1500);
    }
  }



  // helper

  inCommaArray( value, stringComma ) {
    if ( stringComma.split(',').indexOf(value) === -1 ) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * scroll to a point
   *
   * @param position | number
   *
   * @return void
   */
  scrollToTop(position): void {
    setTimeout(()=>{
      this.content.scrollToTop(position);
      console.log('timeout');
    },500);
  }





  /**
   * increase cart item by 1 on click add to cart button
   * calls cartsService f(addCartItem)
   * update cartService carted amount
   */
  cartAdder() {
    console.log('product-detail cartAdder');
    const variationId = this.getVariationId();
    const productId = this.singleProduct.id;
    const quantity = 1;

    this.cartService.addTOCart({productId, variationId, quantity}).subscribe();

  }

  /**
   * define animation controls on click add to cart button
   */
  animation() {
    this.animator = this.animationCtrl.create()
    .addElement(document.querySelector('.square'))
    .duration(this.animatorDuration)
    .iterations(1)
    .fromTo('top', '80%', '2%')
    .fromTo('right', '10%', '12px')
    .fromTo('opacity', '0.2', '1');
  }


  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
  toggleHighlight(div: Div): void {
    this.divs.forEach(div=> div.highlighted = false);
    div.highlighted = !div.highlighted;
  }

  loadReviews(productId: number): void {
   
    this.reviewService.getReviews(productId)
      .subscribe(
        reviews => {
        //  this.reviewData = reviews;
          reviews.map(review=>{
            this.reviewService.getReviewsImages(review.id)
              .subscribe(
                images => { 
                  review.images = images;
                },
                error => {
                  console.error('Error retrieving reviews images:', error);
                }
              )
            this.newReviewsArr.push(review);
          });
          
        },
        error => {
          console.error('Error retrieving reviews:', error);
        }
      );
  }
 
}


