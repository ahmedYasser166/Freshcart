import { Component } from '@angular/core';
import { RecentProductsComponent } from "./components/recent-products/recent-products.component";
import {  PopularCategoriesComponent } from "./components/popular-categoeies/popular-categories.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  imports: [RecentProductsComponent, PopularCategoriesComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
