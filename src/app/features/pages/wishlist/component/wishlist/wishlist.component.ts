import { Component, inject, OnInit } from '@angular/core';
import { WishitemComponent } from "../wishitem/wishitem.component";
import { WishlistService } from '../../service/wishlist.service';
import { Wish } from '../../models/wish.interface';

@Component({
  selector: 'app-wishlist',
  imports: [WishitemComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent  {
  wishDetalis:Wish ={} as Wish
  isLoading : boolean =true
private readonly wishlistService = inject(WishlistService)



loadwishlist(){
  this.wishlistService.getLoggedUserWishlist().subscribe({
    next:(res=>{
      console.log(res);
      this.wishDetalis = res
      this.isLoading=  false
    })
  })
}

removeWishlist(id: string) {
  this.wishlistService.removeProductWishlist(id).subscribe({
    next: (res) => {
      console.log("Product removed:", res);
      this.wishDetalis.data = this.wishDetalis.data.filter(item => item.id !== id);
      this.wishlistService.getLoggedUserWishlist().subscribe({
        next: (wishlist) => {
          this.wishlistService.wishcounter.next(wishlist.count); 
        }
      });

    },
    error: (err) => {
      console.error("Error removing product", err);
    }
  });
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.loadwishlist()
}
}
