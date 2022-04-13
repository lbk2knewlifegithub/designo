import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { listInLeft, slideInRight } from '@lbk/anims';
import { Comment } from '@lbk/models';

@Component({
  selector: 'lbk-comment-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul @listInLeft class="bg-white rounded-xl md:p-6 lg:px-8">
      <!--      Total Comments-->
      <li *ngIf="totalComments" class="p-6 pb-0 md:p-0 md:pb-2">
        <h3>{{ totalComments }} Comments</h3>
      </li>
      <!--      end Total Comments-->

      <!--      Comment List-->
      <li
        *ngFor="let comment of comments; index as i; trackBy: identifyComment"
      >
        <lbk-comment @slideInRight [comment]="comment"></lbk-comment>
      </li>
      <!--      end Comment List-->
    </ul>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  animations: [listInLeft({ item: 'lbk-comment' }), slideInRight()],
})
export class CommentListComponent {
  @Input()
  comments!: Comment[];

  identifyComment(index: number, comment: Comment) {
    return comment.comment_id;
  }

  get totalComments() {
    return (
      this.comments.length +
      this.comments.reduce(
        (amount, comment) =>
          amount + (comment.replies ? comment.replies.length : 0),
        0
      )
    );
  }
}
