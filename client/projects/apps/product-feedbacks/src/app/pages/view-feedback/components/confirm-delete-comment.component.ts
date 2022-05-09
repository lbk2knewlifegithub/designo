import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FeedbacksFacade } from '../../../state';
import { DialogRef } from '@ngneat/dialog';
import { Observable, Subscription } from 'rxjs';
import { ViewFeedbacksFacade } from './../state/view-feedback.facade';

interface Data {
  comment_id: number;
}

@Component({
  template: `
    <div *ngIf="deleting$ | async; else ask" class="p-6 flex justify-center">
      <!-- radiation icon -->
      <i
        class="fa-solid fa-circle-radiation text-[10rem] text-error animate-spin"
      ></i>
      <!-- end radiation icon -->
    </div>

    <ng-template #ask>
      <div class="p-6">
        <h3 class="mt-4">Are your sure delete this comment forever?</h3>

        <div class="flex justify-end gap-6 mt-8">
          <!-- Delete Button -->
          <button
            type="button"
            [disabled]=""
            class="btn btn-error"
            (click)="deleteComment()"
          >
            Delete
          </button>
          <!-- end Delete Button -->

          <!-- Cancel delete -->
          <button type="button" class="btn btn-ghost" (click)="close()">
            Cancel
          </button>
          <!-- end Cancel delete -->
        </div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteCommentComponent implements OnInit, OnDestroy {
  deleting$!: Observable<boolean>;
  subscription?: Subscription;

  constructor(
    public readonly _ref: DialogRef<Data, boolean>,
    private readonly _facade: ViewFeedbacksFacade,
    private readonly _feedbacksFacade: FeedbacksFacade
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.deleting$ = this._facade.deletingComments$;
  }

  deleteComment() {
    this._feedbacksFacade.deleteComment(this._ref.data.comment_id);

    this.subscription = this._facade.deletingComments$.subscribe((deleting) => {
      if (deleting) return;
      this._ref.close();
    });
  }

  close() {
    this._ref.close();
  }
}
