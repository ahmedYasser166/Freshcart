import { Component, Inject, inject, OnInit } from '@angular/core';
import { ProducService } from '../../../../../shared/service/product/produc.service';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductItemComponent } from '../../../../../shared/components/ui/product-item/product-item.component';
import { CartService } from '../../../cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../wishlist/service/wishlist.service';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.css',
})
export class RecentProductsComponent implements OnInit {
  products!: Product[];
  private readonly _productService = inject(ProducService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly wishlistService =inject(WishlistService)

  getproducts() {
    this._productService.getproducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete() {
        console.log('complete');
      },
    });
  }
  addProductToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.showtoaster('Product Added Successfully');
        this.cartService.cartcounter.next(res.numOfCartItems);
      },
    });
  }
//////////////////////// ===>wishlist

AddProductToWishList(id: string) {
  this.wishlistService.addProductToWishlist(id).subscribe({
    next: (res) => {
      // console.log(' Product Added:', res);
      this.showtoaster('Product Added Successfully');

      this.wishlistService.getLoggedUserWishlist().subscribe({
        next: (wishlist) => {
          this.wishlistService.wishcounter.next(wishlist.count); 
        }
      });
    },

  });
}



  showtoaster(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      timeOut: 1500,
    });
  }
  ngOnInit(): void {
    this.getproducts();
  }
}
