import { Component, inject } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../interface/order';

@Component({
  imports:[CommonModule],
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
  orders: Order[] = []; 
  userId: string = ''; 

  loadOrder() {
    this.userId = this.authService.getUserId(); 

    if (!this.userId) {
      console.error('User ID not found!');
      return;
      this.userId = this.authService.getUserId();
console.log('User ID:', this.userId);

    }

    this.orderService.getAllOrders(this.userId).subscribe({
      next: (res) => {
        console.log('Full API Response:', res);
        
        if (Array.isArray(res) && res.length > 0) {
          this.orders = res; 
          console.log('Orders:', this.orders);
        } else {
          console.warn('No valid orders found in API response.');
        }
      }
      
    });
  }

  ngOnInit(): void {
    this.loadOrder();
  }
}
