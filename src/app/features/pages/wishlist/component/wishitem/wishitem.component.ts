import { CartService } from './../../../cart/service/cart.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { data } from '../../models/wish.interface';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../service/wishlist.service';

@Component({
  selector: 'app-wishitem',
  imports: [],
  templateUrl: './wishitem.component.html',
  styleUrl: './wishitem.component.css',
})
export class WishitemComponent {
  @Input() data: data = {} as data;
 @Output () removeWishlist =new EventEmitter<string>()

 private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService)
 addtocart(){

  this.cartService.addProductToCart(this.data.id).subscribe({
    next: (res) => {
      this.showtoaster('Product Added Successfully');
      this.cartService.cartcounter.next(res.numOfCartItems);
    }
  });


 }

 showtoaster(msg: string) {
  this.toastr.success(msg, '', {
    progressBar: true,
    timeOut: 1500,
  });
}
  onRemove(){
this.removeWishlist.emit(this.data._id)
  }
}
