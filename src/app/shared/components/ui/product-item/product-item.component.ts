import { RouterLink } from '@angular/router';
import { Product } from './../../../interfaces/product';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { WishlistService } from '../../../../features/pages/wishlist/service/wishlist.service';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
@Input() product! :Product 
@Output() addToCart = new EventEmitter<string>()
@Output() AddToWishList = new EventEmitter<string>()


onAddToCart(){
this.addToCart.emit(this.product._id)
}

onAddToWishList(){
this.AddToWishList.emit(this.product._id)
}
}

