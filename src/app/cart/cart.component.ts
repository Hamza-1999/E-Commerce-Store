import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { ProductService } from '../service/productService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy, OnInit {
  cartItems:any;
  total:any;
  constructor(private productService: ProductService, private sharedService:SharedService) { 
    this.sharedService.getCartItems().subscribe((data)=>{
      this.cartItems = data
    })
  }
  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') as any) 
    console.log(this.cartItems,"check cartitems")
    let totArr = this.cartItems.map((el:any)=>el.price*el.quantity)
    console.log(totArr,"totArr")
    this.total = totArr.reduce((a:any,b:any)=>a+b).toFixed(2) 
  //  this.total = this.cartItems.reduce((a:any,b:any)=>(a.price*a.quantity)+(b.price*b.quantity))
    // this.total = Number(this.cartItems.quantity) * Number(this.cartItems.price)
    // console.log((this.cartItems.quantity),'cart')

  }
  // cartItems:any;
  // private sharedSubscription : Subscription|any
  // constructor(private sharedService: SharedService,){
  //   this.sharedService.getCartItems().subscribe((data)=>{
  //     this.cartItems = data
  //   })
  // }
  @HostListener('window:unload', ['$event'])
  ngOnDestroy() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
  }
 
  titleSet(ttle: any) {
    if (ttle.length >= 40) {
      return ttle.slice(0, 40) +'....'
    } else {
      return ttle
    }
  }
}

