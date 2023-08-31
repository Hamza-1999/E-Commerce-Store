import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this.http.get(`http://localhost:3000/products`)
  }
  getSingleProduct(id:any){
    return this.http.get(`http://localhost:3000/products/${id}`)
  }
  getSingleProduct2(category:any){
    return this.http.get(`http://localhost:3000/products/${category}`)
  }
}