import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HomeFacade } from '../state/home.facade';
import { SortFeedback } from '../state/home.reducer';

@Component({
  selector: 'lbk-home-sub-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="bg-neutral-300 py-2 container md:bg-transparent xl:px-0 xl:py-0"
    >
      <nav
        class="flex items-center justify-between md:bg-neutral-300 md:pl-6 md:pr-3 md:py-3 md:rounded-xl"
      >
        <div class="flex items-center md:gap-4 ">
          <!--        Number Of Feedbacks is Suggestions-->
          <div class="hidden text-white gap-4 md:flex">
            <div>
              <img
                src="assets/suggestions/icon-suggestions.svg"
                alt="Icon Suggestion"
              />
            </div>
            <h3>{{ numberOfFeedbacksSuggestion$ | async }} Suggestions</h3>
          </div>
          <!--        end Number Of Feedbacks is Suggestions-->

          <!-- SortBy -->
          <lbk-sort-by
            [sort]="(sort | async)!"
            [sorts]="sorts"
            (changeSort)="changeFilter($event)"
          ></lbk-sort-by>
          <!-- end SortBy -->
        </div>

        <div class="flex items-center">
          <!-- Profile -->
          <lbk-profile-button class="hidden mr-4 md:block"></lbk-profile-button>
          <!-- end Profile -->

          <!-- Add Feedback -->
          <lbk-create-feedback-button></lbk-create-feedback-button>
          <!-- end Add Feedback -->
        </div>
      </nav>
    </header>
  `,
})
export class HomeSubHeaderComponent implements OnInit {
  sorts!: SortFeedback[];
  sort!: Observable<SortFeedback>;
  numberOfFeedbacksSuggestion$!: Observable<number>;

  constructor(public readonly _facade: HomeFacade) {}

  ngOnInit(): void {
    this.sorts = Object.values(SortFeedback);
    this.sort = this._facade.sort;
    this.numberOfFeedbacksSuggestion$ = this._facade.suggestionFeedbacks$.pipe(
      map((feedbacks) => feedbacks.length)
    );
  }

  changeFilter(filter: SortFeedback) {
    this._facade.setFilter(filter);
  }
}
