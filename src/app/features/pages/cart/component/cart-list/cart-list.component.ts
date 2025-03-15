import { Component, inject } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { cart } from '../../models/cart.interface';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-list',
  imports: [ RouterLink ,CartItemComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent {
  private readonly _cartService = inject(CartService);
  cartDetails: cart = {} as cart;
  isLoading: boolean = false;

  loadcart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
                this.cartDetails = res;
        this.isLoading = true;
      },
    });
  }

  removeProduct(id: string) {
    this._cartService.removeCartItem(id).subscribe({
      next: (res) => {
                this.cartDetails = res;
        this._cartService.cartcounter.next(res.numOfCartItems)
      },
    });
  }


  updateQty(id:string,count:number){
    this._cartService.updateCartQuantity(id,count).subscribe({
      next:(res)=>{
       this.cartDetails = res;
        this._cartService.cartcounter.next(res.numOfCartItems)
      }
    })
  }

  clearCart(){
    this._cartService.clearCart().subscribe({
      next:(res)=>{
if(res.message=='success'){
  this.loadcart()

}
this._cartService.cartcounter.next(res.numOfCartItems)

      }
    })
    
  }

  ngOnInit(): void {
    this.loadcart();
  }
}
