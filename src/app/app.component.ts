import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
// import { ProductService } from './service/productService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'shoppingCart';
  headerCart: any = 0
  enabler = true;
  // cartItems:any;
  private sharedSubscription: Subscription | any
  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if(e.url == "/"){
          this.enabler = true

        }else{
          this.enabler = false

        }
      }
    });
    this.sharedService.getCartItemCount().subscribe((val) => {
      this.headerCart = val
    })
  }
  ngOnInit() {
  this.headerCart = JSON.parse(localStorage.getItem('headerCart') as any)
  }
  ngOnDestroy(): void {
    // this.sharedSubscription.unsubscribe();

  }
  navigateToCart() {
    this.router.navigate(['/cart'])
  }
  search(e:any){
    this.sharedService.sentSearchValue(e.target.value)
    
  }
  // cartData:string[]=['id','title','price','description','category','image','rating','rate','count']
  //   productData:any[] = [];
  //   cartData:any[]=[]
  // @Input() headerCart:any

  //   data1='';

  //   constructor(
  //     private productService:ProductService,
  //   ){}

  //   ngOnInit() {
  //     this.productService.getAllProducts().subscribe((res)=>{
  //       // this.productData = res
  //       let tempArr = res.map((prod:any)=>{
  //         return {
  //           ...prod,
  //           quantity:0
  //         }
  //       })
  //       this.productData = tempArr
  //       console.log(tempArr,'tempArr')
  //     })
  //     // let obj = {
  //     //   {

  //     //   }
  //     // }
  //   }
  //   decQuantity(id:any){
  //     let index = this.productData.findIndex((data)=>data.id == id)
  //     if(this.productData[index].quantity>1){
  //     this.productData[index].quantity-=1
  //     }

  //   }
  //   addQuantity(id:any){
  //     let index = this.productData.findIndex((data)=>data.id == id)
  //     console.log(index,"check index")
  //     if(this.productData[index].quantity == 0){
  //       return
  //     }
  //     this.productData[index].quantity+=1

  //   }
  //   checkProductInCart(id:number){
  //     let index = this.cartData.findIndex((data)=>data.id==id) 
  //     if(index == -1){
  //       return false
  //     }else{
  //       return true
  //     }
  //   }
  //   delete(id:any){
  //     let index1 = this.productData.findIndex((data)=>data.id == id)
  //     this.productData[index1].quantity = 0
  //     let index2 = this.cartData.findIndex((data)=>data.id == id)
  //     this.cartData.splice(index2,1)
  //     this.headerCart -=1

  //   }
  //   addToCart(product:any){
  //     this.cartData.push(product)
  //     let productDataIndex =this.productData.findIndex((data)=>data.id == product.id)
  //     this.productData[productDataIndex].quantity+=1
  //     this.headerCart +=1  
  //     console.log(product,"product add")
  //   }
}
