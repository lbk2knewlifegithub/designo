import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HomeFacade } from './../state/home.facade';

@Component({
  selector: 'lbk-feedbacks-empty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white rounded-lg ">
      <div
        class="max-w-lg mx-auto flex flex-col items-center p-6  md:pb-20 md:pt-28"
      >
        <!-- Illustration Empty -->
        <img
          src="assets/suggestions/illustration-empty.svg"
          alt="Empty Illustration"
        />
        <!-- end Illustration Empty -->

        <div class="mt-10 text-center">
          <h3>There is no feedback yet</h3>

          <p class="mt-4 text-sm text-neutral">
            Got a suggestion? Found a bug that needs to be squashed?
            <br class="md:inline" />
            We love hearing about new ideas to improve our app.
          </p>
        </div>

        <!-- Add Feedback -->
        <a
          routerLink="/create-feedback"
          [queryParams]="queryParams$ | async"
          class="btn btn-accent mt-6  flex !items-center gap-2 px-3 md:mt-16"
        >
          <!-- Plus Icon -->
          <i class="fa fa-plus text-sm font-bold"></i>
          <!-- end Plus Icon -->

          <!--      Text-->
          Add Feedback
          <!--      end Text-->
        </a>
        <!-- end Add Feedback -->
      </div>
    </div>
  `,
})
export class FeedbacksEmptyComponent implements OnInit {
  queryParams$!: Observable<any>;

  constructor(private readonly _facade: HomeFacade) {}

  ngOnInit(): void {
    this.queryParams$ = this._facade.category$.pipe(
      map((category) => ({ category: category?.toLowerCase() }))
    );
  }
}
