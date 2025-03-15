import { OrdersComponent } from './features/pages/orders/component/orders/orders.component';
import { CartListComponent } from './features/pages/cart/component/cart-list/cart-list.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { isLoogedGuard } from './core/guards/is-looged.guard';

export const routes: Routes = [



    { path: "auth", component: AuthLayoutComponent, canActivate:[isLoogedGuard], children: [
        { path: "", loadComponent:()=>import('./core/pages/register/register.component').then(c => c.RegisterComponent)},
        { path: "register", loadComponent:()=>import('./core/pages/register/register.component').then(c => c.RegisterComponent)},
        { path: "login", loadComponent:()=>import('./core/pages/login/login.component').then(c => c.LoginComponent)},
        // { path: "forget-password", loadComponent:()=>import('./core/pages/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent)},
    ]},

    { path: "", loadComponent:()=>import('./core/pages/login/login.component').then(c => c.LoginComponent) },
    { path: "register", loadComponent:()=>import('./core/pages/register/register.component').then(c => c.RegisterComponent) },


    { 
        path: "",
        canActivate: [authGuard],
        children: [
            { path: "home", loadComponent:()=>import('./features/pages/home/home.component').then(c => c.HomeComponent) },
            { path: "brands", loadComponent:()=>import('./features/pages/brands/component/brands.component').then(c => c.BrandsComponent) },
            { path: "products", loadComponent:()=>import('./features/pages/products/products.component').then(c => c.ProductsComponent) },
            { path: "categories", loadComponent:()=>import('./features/pages/categories/components/categories/categories.component').then(c => c.CategoriesComponent) },
            { path: "products-details/:id", loadComponent:()=>import('./features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent) },
            { path: "cart", loadComponent:()=>import('./features/pages/cart/component/cart-list/cart-list.component').then(c => c.CartListComponent) },
            { path: "wishlist", loadComponent:()=>import('./features/pages/wishlist/component/wishlist/wishlist.component').then(c => c.WishlistComponent) },
            { path: "checkout/:id", loadComponent:()=>import('./features/pages/orders/component/checkout/checkout.component').then(c => c.CheckoutComponent) },
            { path: "allorders", loadComponent:()=>import('./features/pages/orders/component/orders/orders.component').then(c => c.OrdersComponent) },
        ]
    },

    { path: "**", loadComponent:()=>import('./core/pages/not-found/not-found.component').then(c => c.NotFoundComponent) }
];

    