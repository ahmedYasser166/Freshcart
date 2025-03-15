import { CartService } from './../cart/service/cart.service';
import { Product } from './../../../shared/interfaces/product';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProducService } from '../../../shared/service/product/produc.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  imports:[CommonModule ,CarouselModule],
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit { 
  productId!: string | null;
  productDetails: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly producService = inject(ProducService);
  private readonly toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getProductId();
  }

  getProductId() {
    this.activatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.productId = urlData.get('id');
        if (this.productId) {
          this.getProductDetails(this.productId); 
        }
      },
    });
  }

  getProductDetails(id: string) {
    this.producService.getProductDetails(id).subscribe({
      next: (response) => {
        this.productDetails = response.data; 
        console.log(" Product Details Loaded:", this.productDetails);
      },
    });
  }

  onAddToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.showToaster('Product Added Successfully');
        this.cartService.cartcounter.next(res.numOfCartItems);
      },
 
    });
  }

  showToaster(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      timeOut: 1500,
    });
  }

  carouselOptions: OwlOptions = {
    loop: true, 
    autoplay: true, 
    autoplayTimeout: 2000, 
    autoplayHoverPause: true, 
    nav: false, 
    dots: true, 
    items: 1, 
    navText: ['<span class="text-2xl">←</span>', '<span class="text-2xl">→</span>']
  };
}
