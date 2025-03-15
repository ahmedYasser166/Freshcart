import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProducService {

 private readonly  _httpClient = inject(HttpClient)
  constructor() { }
  getproducts(): Observable<any>{
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  ////////////
  getProductDetails(_id: null | string): Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${_id}`);
 }
}
