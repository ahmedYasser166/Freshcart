import { Component } from '@angular/core';
import {  OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['<i class="fa-solid  fa-left-long"></i>', '<i class="fa-solid fa-right-long"></i>'],
  responsive: {
    0: {
      items: 1
    }
  },
  nav: true,
  autoplay: true, 
  autoplayTimeout: 2000, 
  autoplayHoverPause: true 
}

}
