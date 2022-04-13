import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import * as fromEditFeedback from './edit-feedback-page.selectors';

/**
 * - Edit Feedback Page Facade
 */
@Injectable({ providedIn: 'root' })
export class EditFeedbackPageFacade {
  /**
   * - Deleting Feedback
   */
  deletingFeedback$ = this._store.select(
    fromEditFeedback.selectDeletingFeedback
  );

  /**
   * - Editing Feedback
   */
  editingFeedback$ = this._store.select(fromEditFeedback.selectEditingFeedback);

  pending$: Observable<boolean> = combineLatest([
    this.deletingFeedback$,
    this.editingFeedback$,
  ]).pipe(map(([deleting, editing]) => deleting || editing));

  /**
   * - Select Error
   */
  error$ = this._store.select(fromEditFeedback.selectError);

  /**
   * - Constructor
   * @param _store
   */
  constructor(private readonly _store: Store) {}
}
