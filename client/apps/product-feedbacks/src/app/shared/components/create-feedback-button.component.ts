import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lbk-create-feedback-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      routerLink="/create-feedback"
      class="btn btn-accent flex !items-center gap-2 px-3"
    >
      <!-- Plus Icon -->
      <i class="fa fa-plus text-sm font-bold"></i>
      <!-- end Plus Icon -->

      <!--      Text-->
      Add Feedback
      <!--      end Text-->
    </a>
  `,
})
export class CreateFeedbackButtonComponent {}

@NgModule({
  imports: [RouterModule],
  exports: [CreateFeedbackButtonComponent],
  declarations: [CreateFeedbackButtonComponent],
})
export class CreateFeedbackButtonModule {}
