import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
// import { SharedService } from '../shared/shared.service';
// import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../service/productService';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  product: any;
  prodId:any;
  constructor(
    private productService:ProductService,
    private route: ActivatedRoute,
    // private router:Router

  ) {
  this.route.params.subscribe((params:any) => {
      this.prodId = params['id'];
      console.log(this.prodId,'checkid')
      // console.log(router,'route')
    })
  }
  ngOnInit() {
    this.productService.getSingleProduct2(this.prodId).subscribe((res)=>{
      this.product = res
      // console.log(res,'reschk')
    })
  }
}
