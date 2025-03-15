import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  httpClient = inject(HttpClient);
  constructor() {}

  getAllBrands(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/brands');
  }
}
