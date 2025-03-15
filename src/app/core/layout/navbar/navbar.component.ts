import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../../features/pages/cart/service/cart.service';
import { WishlistService } from '../../../features/pages/wishlist/service/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navbarCounter: number = 0;
  navbarwishCounter: number = 0;
  private readonly cartService = inject(CartService);
  private readonly platformI = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  private readonly wishlistService = inject(WishlistService);
  logout() {
    this.authService.logout();
  }
  isAuthPage: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isAuthPage = this.router.url.includes('/auth');
    });
  }

  ngOnInit(): void {
    this.cartService.cartcounter.subscribe({
      next: (value) => {
        this.navbarCounter = value;
      },
    }
  );

  this.wishlistService.wishcounter.subscribe({
    next:(value)=>{
      this.navbarwishCounter=value
    }
  })



    if (isPlatformBrowser(this.platformI)) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          console.log(res);
          this.cartService.cartcounter.next(res.numOfCartItems)
        },
      })
      //////////
      this.wishlistService.getLoggedUserWishlist().subscribe({
        next: (res) => {
          console.log(res);
          this.wishlistService.wishcounter.next(res.count)
        },
      })
      ;
    }
  
 
  }
  
}
