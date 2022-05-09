import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CategoryService } from '../services';
import { Product } from '../../../shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryResolver implements Resolve<Product[]> {
  constructor(private readonly _categoryService: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
    const name = route.params['name'];
    return this._categoryService.getProducts(name);
  }
}
