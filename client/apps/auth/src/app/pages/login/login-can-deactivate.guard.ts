// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   CanDeactivate,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { map, Observable, tap } from 'rxjs';
// import { LoginPageComponent } from './containers/login-page.component';

// @Injectable({ providedIn: 'root' })
// export class LoginCanDeactivateGuard
//   implements CanDeactivate<LoginPageComponent>, CanActivate
// {
//   constructor(private readonly _store: Store) {}

//   canDeactivate(
//     component: LoginPageComponent,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot
//   ): Observable<boolean> {
//     return component.pending$.pipe(map((pending) => !pending));
//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> {
//     return this._store
//       .select(fromAuth.selectLoggedIn)
//       .pipe(map((loggedIn) => !loggedIn));
//   }
// }
