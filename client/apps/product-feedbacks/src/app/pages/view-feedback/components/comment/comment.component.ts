import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { collapseOut, expandIn } from '@lbk/anims';
import { AddCommentDTO } from '@lbk/dto';
import { Comment, User, UserComment } from '@lbk/models';
import { AuthFacade } from '@lbk/state/auth';
import { FeedbacksFacade } from '@lbk/state/feedbacks';
import { DialogService } from '@ngneat/dialog';
import { combineLatest, map, Observable, take, switchMap, of } from 'rxjs';
import { ConfirmDeleteCommentComponent } from '../confirm-delete-comment.component';
import { CoreFacade } from './../../../../core/state/core.facade';
import { ViewFeedbacksFacade } from './../../state/view-feedback.facade';

@Component({
  selector: 'lbk-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [expandIn(), collapseOut()],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;

  isOwnedByUser$!: Observable<boolean>;
  updatingComment$!: Observable<boolean>;
  user$!: Observable<User | UserComment>;
  username$!: Observable<string>;

  shownReplyForm = false;
  shownEditForm = false;

  constructor(
    private readonly _feedbacksFacade: FeedbacksFacade,
    private readonly _authFacade: AuthFacade,
    private readonly _coreFacade: CoreFacade,
    private readonly _dialogService: DialogService,
    private readonly _facade: ViewFeedbacksFacade
  ) {}

  ngOnInit(): void {
    this.isOwnedByUser$ = combineLatest([
      this._feedbacksFacade.selectedFeedback$,
      this._authFacade.user$,
    ]).pipe(
      map(([feedback, user]) => {
        if (!feedback || !user) return false;
        return this.comment.user.user_id === user.user_id;
      })
    );

    this.updatingComment$ = this._facade.updatingComments$;

    this.user$ = this.isOwnedByUser$.pipe(
      switchMap((isOwnedByUser) => {
        return isOwnedByUser
          ? (this._authFacade.user$ as Observable<User>)
          : of(this.comment.user);
      })
    );

    this.username$ = this.user$.pipe(map((u) => u.username));
  }

  toggleReply(): void {
    if (!this.shownReplyForm) {
      this._authFacade.loggedIn$.pipe(take(1)).subscribe((loggedIn) => {
        if (!loggedIn) return this._coreFacade.showRequiredLogin();

        this.shownReplyForm = true;
      });
      return;
    }
    this.shownReplyForm = false;
  }

  reply(content: string) {
    const addCommentDTO: AddCommentDTO = {
      content,
      parent_id: this.comment.parent_id || this.comment.comment_id,
      replying_to: this.comment.user.username,
    };

    this._feedbacksFacade.addCommentSelectedFeedback(addCommentDTO);

    this.closeReplyForm();
  }

  deleteComment() {
    this._dialogService.open(ConfirmDeleteCommentComponent, {
      minHeight: 100,
      width: 420,
      closeButton: false,
      enableClose: false,
      data: { comment_id: this.comment.comment_id },
    });
  }

  editButtonClick() {
    this.shownEditForm = !this.shownEditForm;
  }

  update(content: string) {
    if (content !== this.comment.content) {
      this._feedbacksFacade.updateComment(this.comment.comment_id, content);
    }

    // Close Edit Form
    this.shownEditForm = false;
  }

  closeReplyForm() {
    this.shownReplyForm = false;
  }
}
