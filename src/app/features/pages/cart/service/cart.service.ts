import { AuthService } from './../../../../core/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartcounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  // ==========>add
  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId,
    });
  }

  // ==========>add

  // ==========>Update
  updateCartQuantity(productId: string, count: number): Observable<any> {
    return this.httpClient.put(
      'https://ecommerce.routemisr.com/api/v1/cart/' + productId,
      {
        count,
      }
    );
  }
  // ==========>Update
  // ==========>get
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }
  // ==========>get
  // ==========>DELETE
  removeCartItem(productId: string): Observable<any> {
    return this.httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart/' + productId
    );
  }
  // ==========>DELETE
  // ==========>clear
  clearCart(): Observable<any> {
    return this.httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart'
    );
  }
  // ==========>clear
}
