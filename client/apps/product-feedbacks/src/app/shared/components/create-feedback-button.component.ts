import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthFacade } from '@lbk/state/auth';
import { CoreFacade } from '../../core/state';
import { take } from 'rxjs';

@Component({
  selector: 'lbk-create-feedback-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="onClick()"
      class="btn btn-accent flex !items-center gap-2 px-3"
    >
      <!-- Plus Icon -->
      <i class="fa fa-plus text-sm font-bold"></i>
      <!-- end Plus Icon -->

      <!--      Text-->
      Add Feedback
      <!--      end Text-->
    </button>
  `,
})
export class CreateFeedbackButtonComponent {
  constructor(
    private readonly _router: Router,
    private readonly _authFacade: AuthFacade,
    private readonly _coreFacade: CoreFacade
  ) {}

  onClick() {
    this._authFacade.loggedIn$.pipe(take(1)).subscribe((loggedIn) => {
      if (loggedIn) return this._router.navigateByUrl('/create-feedback');
      return this._coreFacade.showRequiredLogin();
    });
  }
}

@NgModule({
  imports: [RouterModule],
  exports: [CreateFeedbackButtonComponent],
  declarations: [CreateFeedbackButtonComponent],
})
export class CreateFeedbackButtonModule {}
