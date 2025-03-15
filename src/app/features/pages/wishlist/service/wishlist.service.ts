import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishcounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private httpClient :HttpClient) { }
// add
  addProductToWishlist(productId:string):Observable<any>{
 return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist' ,{productId}) }
// add

// remove
removeProductWishlist(productId: string): Observable<any> {
  return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`);
}
// remove
// get
  getLoggedUserWishlist():Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist') }
// get




  }