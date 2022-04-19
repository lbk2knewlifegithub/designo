import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromData, Product } from '../../../shared';
import { map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private readonly _http: HttpClient) {}

  getProducts(category: string): Observable<Product[]> {
    // return this._http.get<Product[]>(env.apiUrl).pipe(
    //   map((products) =>
    //     products.filter((product) => product.category === category)
    //   ),
    //   map((products) => products.sort((a, b) => (a.new ? -1 : 1)))
    // );
    return of(fromData.products).pipe(
      map((products) =>
        products.filter((product) => product.category === category)
      ),
      map((products) => products.sort((a, b) => (a.new ? -1 : 1)))
    );
  }
}
