import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FeedbackCategory } from '@lbk/models';
import { Observable } from 'rxjs';
import { HomeFacade } from '../state/home.facade';

@Component({
  selector: 'lbk-feedback-categories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul
      class="p-6 flex flex-wrap items-start justify-start gap-x-2 gap-y-3  rounded-xl"
    >
      <!--      Category-->
      <li *ngFor="let c of categories">
        <button
          class="btn btn-secondary capitalize"
          [class.active]="c === (category$ | async)"
          (click)="changeCategory(c)"
        >
          {{ c || 'All' | upper: 2 }}
        </button>
      </li>
      <!--      end Category-->
    </ul>
  `,
  styles: [
    `
      :host {
        @apply bg-white;
      }
      button.active {
        @apply bg-primary-200 text-white;
      }
    `,
  ],
})
export class FeedbackCategoriesComponent implements OnInit {
  categories!: (FeedbackCategory | undefined)[];
  category$!: Observable<FeedbackCategory | undefined>;

  constructor(public _facade: HomeFacade) {}

  changeCategory(category: FeedbackCategory | undefined) {
    this._facade.setCategory(category);
  }

  ngOnInit(): void {
    this.categories = [undefined, ...Object.values(FeedbackCategory)];
    this.category$ = this._facade.category$;
  }
}
