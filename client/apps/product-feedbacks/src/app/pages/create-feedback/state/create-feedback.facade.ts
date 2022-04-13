import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCreating } from './create-feedback.selectors';

@Injectable({ providedIn: 'root' })
export class CreateFeedbackPageFacade {
  creating$: Observable<boolean> = this._store.select(selectCreating);

  constructor(private readonly _store: Store) {}
}
