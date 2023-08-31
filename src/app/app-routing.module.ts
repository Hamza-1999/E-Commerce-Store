import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './service/productService';
import { CartComponent } from './cart/cart.component';
import { CartViewComponent } from './cart-view/cart-view.component';

const routes: Routes = [
  {path:'',component:ProductsComponent},
  {path:'cart',component:CartComponent},
  // {path:'cart-view',component:CartViewComponent},
  {path:`cart-view/:id`,component:CartViewComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
