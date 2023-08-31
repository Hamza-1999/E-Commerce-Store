import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../service/productService';
import { SharedService } from '../shared/shared.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
// import { ProductService } from './service/productService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  title = 'shoppingCart';
  productData: any[] = [];
  productDataCopy:any[]=[]  
  cartData: any[] = []
  headerCart: any = 0

  data1 = '';

  constructor(
    private productService: ProductService,
    private sharedService: SharedService,
    private router: Router
  ) { 
    this.sharedService.getSearchValue().subscribe((val)=>{
      let filterValue : string = val.toLowerCase()
      let productData2 = this.productDataCopy
      let prods = productData2.filter((el)=>{
        let title = el.title.toLowerCase()
        return title.includes(filterValue)
      })
      // console.log("prods" , prods);
      this.getData(prods)
      if(filterValue == ''){
      this.getData(this.productData)

      }
      // console.log(prods,"check prods:l")
    })
  }

  singleProduct(productId: any) {
    this.router.navigate([`/cart-view/${productId}`])
    
    // let cartClick = this.productData.findIndex((res) => res.id == cart.id)
    // this.productData[cartClick] = cart
    // this.sharedService.sentToViewCart(cart)
    // localStorage.setItem('cartView', JSON.stringify(cart))
  }
  @HostListener('window:unload', ['$event'])
  ngOnDestroy() {
    // localStorage.setItem('name',"Hamza")
    // console.log(this.cartData,'cart data on destroy');
    localStorage.setItem('cartItems', JSON.stringify(this.cartData));
    localStorage.setItem('headerCart', JSON.stringify(this.headerCart));
  }
getData(val:any){
  let tempArr2 = val.map((prod: any) => {
    let findProductIndexInCart = this.cartData.findIndex((cartData) => {
      return prod.id == cartData.id
    })
    if (findProductIndexInCart == -1) {
      return {
        ...prod,
        quantity: 0
      }
    } else {
      let qty = this.cartData[findProductIndexInCart].quantity
      return {
        ...prod,
        quantity: qty
      }
    }
  })
  // console.log(tempArr2,"check tempArr2")
  this.productData = tempArr2
}
  ngOnInit() {
    let cartItemss = JSON.parse(localStorage.getItem('cartItems') as any)
    if (cartItemss != null) {
      this.cartData = cartItemss
    }
    let headerCartss = JSON.parse(localStorage.getItem('headerCart') as any)
    if (headerCartss != -1) {
      this.headerCart = headerCartss
    }
    this.productService.getAllProducts().subscribe((res) => {
      let tempArr = res.map((prod: any) => {
        let findProductIndexInCart = this.cartData.findIndex((cartData) => {
          return prod.id == cartData.id
        })
        if (findProductIndexInCart == -1) {
          return {
            ...prod,
            quantity: 0
          }
        } else {
          let qty = this.cartData[findProductIndexInCart].quantity
          return {
            ...prod,
            quantity: qty
          }
        }
      })
      // console.log(tempArr,"check tempArr")
      this.productData = tempArr
      this.productDataCopy = tempArr
    })
  }
  decQuantity(id: any) {
    let index = this.productData.findIndex((data) => data.id == id)
    let cartIndex = this.cartData.findIndex((data2) => data2.id == id)
    if (this.productData[index].quantity > 1) {
      this.productData[index].quantity -= 1
      this.cartData[cartIndex].quantity -=1
    }
    this.sharedService.sentCartItems(this.cartData);
    // localStorage.setItem('cartItems', JSON.stringify(this.cartData));
  }
  addQuantity(id: any) {
    // console.log(this.productData,"product data before add")
    // console.log(this.cartData,"cartData before add")
    let index = this.productData.findIndex((data) => data.id == id)
    let cartIndex = this.cartData.findIndex((data)=> data.id == id)
    if (this.productData[index].quantity == 0) {
      return
    }
    // console.log(index, "check index")
    // console.log(cartIndex, "check cartIndex")
    // console.log(this.productData[index],"check product item")
    // console.log(this.cartData[cartIndex],"check cart item")
    this.productData[index].quantity += 1
    this.cartData[cartIndex].quantity += 1
    this.sharedService.sentCartItems(this.cartData);
    // console.log(this.productData[index],"check product item")
    // console.log(this.cartData[cartIndex],"check cart item")
    // console.log(this.cartData[cartIndex].quantity,'cartdata after qty')
    // console.log(this.productData,"check productData after add")
    // console.log(this.cartData,"check cartData after add")
  }
  truncateString(title: string) {
    // console.log(title.length, "check title length")
    if (title.length > 30) {
      return title.slice(0, 30) + '...'
    } else {
      return title
    }
  }
    checkProductInCart(id: number) {
    // console.log(this.cartData, "check carat data")
    let index = this.cartData.findIndex((data) => data.id == id)
    if (index == -1) {
      return false
    } else {
      return true
    }
  }
  delete(id: any) {
    let index1 = this.productData.findIndex((data) => data.id == id)
    this.productData[index1].quantity = 0
    let index2 = this.cartData.findIndex((data) => data.id == id)
    if (index2 != -1) {
      this.cartData.splice(index2, 1)
      this.headerCart -= 1
    }
    this.sharedService.updateCartItemCount(this.headerCart)
    this.sharedService.sentCartItems(this.cartData);
   
  }
  addToCart(product: any) {
    // console.log(product,'product addto cart')
    // this.cartData.push(product)
    let prod = {...product}
    prod.quantity = 1
    this.cartData = [...this.cartData,{...prod}] 
    let productDataIndex = this.productData.findIndex((data) => data.id == product.id)
    this.productData[productDataIndex].quantity += 1
    this.headerCart += 1
    this.sharedService.updateCartItemCount(this.headerCart)
    this.sharedService.sentCartItems(this.cartData);
    // console.log(this.productData,"check product data after addtocart")
    // console.log(this.cartData,"check cartData after addtocart")
    // localStorage.setItem('cartItems', JSON.stringify(this.cartData));
    // localStorage.setItem('headerCart', JSON.stringify(this.headerCart));
    // console.log(localStorage.setItem('headerCart', JSON.stringify(this.headerCart)), 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
    // console.log(product, "product add")
  }
}