import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromData, Product } from '../../../shared';
import { map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private readonly _http: HttpClient) {}

  getProduct(slug: string): Observable<Product | undefined> {
    // return this._http
    //   .get<Product[]>(env.apiUrl)
    //   .pipe(
    //     map((products) => products.find((product) => product.slug === slug))
    //   );

    return of(fromData.products).pipe(
      map((products) => products.find((product) => product.slug === slug))
    );
  }
}
