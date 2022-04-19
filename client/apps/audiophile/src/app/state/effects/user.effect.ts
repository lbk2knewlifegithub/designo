// import { Injectable } from '@angular/core';
// import { createEffect } from '@ngrx/effects';
// import { Store } from '@ngrx/store';
// import { fromEvent } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { LayoutActions } from '../state/actions';

// @Injectable()
// export class UserEffects {
//   clicks$ = fromEvent(document, 'click');
//   // keys$ = fromEvent(document, 'keydown');
//   // mouse$ = fromEvent(document, 'mousemove');
//   // scroll$ = fromEvent(document, 'scroll');

//   autoCloseDialog = createEffect(
//     () =>
//       this.clicks$.pipe(
//         tap((click) => {
//           const target = click.target as HTMLElement;
//           const matches = target.matches('.overlay');

//           if (matches) {
//             this._store.dispatch(LayoutActions.closeAllOverlay());
//           }
//         })
//       ),
//     {
//       dispatch: false,
//     }
//   );

//   constructor(private readonly _store: Store) {}
// }
