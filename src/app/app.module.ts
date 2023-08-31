import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { Subscription } from 'rxjs';
import { CartViewComponent } from './cart-view/cart-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductsComponent,
    CartViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Subscription
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
