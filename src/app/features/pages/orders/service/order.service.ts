import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Observable } from 'rxjs';
import { Order } from '../interface/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient, private auth: AuthService) {}
  createCheckout(
    cartId: string | null,
    shippingAddress: {
      details: string;
      phone: string;
      city: string;
    }

  ): Observable<any> {
    
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/' +
        cartId+'?url=http://localhost:4200',
      {
        shippingAddress,
      }
    );
  }

  getAllOrders(id: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  }
  
}
