import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouteFacade {
  returnUrl$ = this._route.queryParamMap.pipe(
    map((params) => params.get('returnUrl'))
  );

  queryParamsWithReturnUrl$ = this._route.queryParamMap.pipe(
    map((params) => params.get('returnUrl')),
    map((returnUrl) => ({ returnUrl }))
  );

  constructor(private readonly _route: ActivatedRoute) {}
}
