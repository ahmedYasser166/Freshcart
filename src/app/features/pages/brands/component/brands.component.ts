import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../service/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent  implements OnInit {

  brandsService = inject(BrandsService)
brands!:any[];

ngOnInit(): void {
this.getBrands()
}

getBrands(){
  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res);
      
      this.brands=res.data
    }
  })
}

 
}
