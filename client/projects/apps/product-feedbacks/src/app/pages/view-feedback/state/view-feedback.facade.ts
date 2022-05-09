import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromViewFeedbacksPage from './view-feedback.selectors';

@Injectable({ providedIn: 'root' })
export class ViewFeedbacksFacade {
  loadingComments$: Observable<boolean> = this._store.select(
    fromViewFeedbacksPage.selectLoadingComments
  );

  deletingComments$: Observable<boolean> = this._store.select(
    fromViewFeedbacksPage.selectDeletingComment
  );

  updatingComments$: Observable<boolean> = this._store.select(
    fromViewFeedbacksPage.selectUpdatingComment
  );

  constructor(private readonly _store: Store) {}
}
