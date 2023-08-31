import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private cartItemCount = new BehaviorSubject<number>(0);
  private cartItems = new BehaviorSubject<any[]>([]);
  private cart = new BehaviorSubject<any>([]);
  private value = new BehaviorSubject<string>("");
  
  updateCartItemCount(count: number) {
    this.cartItemCount.next(count);
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }
  sentCartItems(cartItems:any){
    this.cartItems.next(cartItems)
  }
  getCartItems():BehaviorSubject<any>{
    return this.cartItems;
  }
  sentSearchValue(val:any){
this.value.next(val)
  }
  getSearchValue():BehaviorSubject<any>{
    return this.value
  }
  sentToViewCart(cart:any){
    this.cart.next(cart)
  }
  getToCartView():BehaviorSubject<any>{
    return this.cart
  }
}