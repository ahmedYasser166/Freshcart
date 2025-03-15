import { Product } from './../../../shared/interfaces/product';
import { Component, inject, Input } from '@angular/core';
import { ProducService } from '../../../shared/service/product/produc.service';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../wishlist/service/wishlist.service';
@Component({
  selector: 'app-products',
  imports: [ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products!: Product[];
  private readonly _productService = inject(ProducService);
  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)

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
  addProductToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.showtoaster('Product Added Successfully')
        this.cartService.cartcounter.next(res.numOfCartItems);
      }
    })
  }
  

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
  
  showtoaster(msg:string) {
    this.toastr.success(msg, '',{
      progressBar : true,
      timeOut:1500
    });
  }
  ngOnInit(): void {
    this.getproducts();
  }

}
