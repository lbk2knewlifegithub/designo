import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../../shared';
import { ProductService } from '../services';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Product | undefined> {
  constructor(private readonly _productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product | undefined> {
    const slug = route.params['slug'];
    return this._productService.getProduct(slug);
  }
}
