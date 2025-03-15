import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../../../shared/interfaces/category';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../../../shared/service/categoies/categories.service';


@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule ],
  templateUrl: './popular-categoeies.component.html',
  styleUrl: './popular-categoeies.component.css'
})
export class PopularCategoriesComponent  implements OnInit{

_categoriesService = inject(CategoriesService)

categories!:Category[] 

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 500,
  navText: ['<i class="fa-solid fa-left-long"></i>', '<i class="fa-solid fa-right-long"></i>'],
  responsive: {
    0: { items: 1 },
    400: { items: 3 },
    740: { items: 5 },
    1024: { items: 7 } 
  },
  nav: false,
  autoplay: true,
  autoplayTimeout: 3000, 
  autoplaySpeed: 2000,
  autoplayHoverPause: true, 
  slideTransition: 'ease-in-out', 
};

ngOnInit(): void {
  this.getCategories()
}

getCategories(){
this._categoriesService.getAllCategories().subscribe({
next: (res)=>{
  console.log(res.data);
  this.categories=res.data
},
error: (err)=>{
  console.log("err");
  
},
complete: ()=>{
  console.log("complete categories");
  
}
})
}
}
