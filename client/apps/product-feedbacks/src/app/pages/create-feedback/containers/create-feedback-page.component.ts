import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateFeedbackDTO } from '@lbk/dto';
import { FeedbackCategory } from '@lbk/models';
import { FeedbacksFacade } from '../../../state';
import { map, Observable, pluck } from 'rxjs';
import { CreateFeedbackPageFacade } from '../state/create-feedback.facade';

@Component({
  selector: 'lbk-create-feedback-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="container mt-6 max-w-[540px] md:mt-14 md:px-0">
      <lbk-go-back></lbk-go-back>
    </header>

    <main class="container pb-20 mt-10 max-w-[540px] md:mt-16 md:px-0">
      <lbk-feedback-form
        [pending]="(creating$ | async)!"
        [category]="(category$ | async)!"
        (createFeedback)="createFeedback($event)"
      ></lbk-feedback-form>
    </main>
  `,
})
export class CreateFeedbackPageComponent implements OnInit {
  creating$!: Observable<boolean>;
  category$!: Observable<FeedbackCategory | undefined>;

  constructor(
    private readonly _facade: FeedbacksFacade,
    private readonly _createPage: CreateFeedbackPageFacade,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.creating$ = this._createPage.creating$;

    this.category$ = this._route.queryParams.pipe(
      pluck('category'),
      map<FeedbackCategory, FeedbackCategory | undefined>((c) => {
        const categoryLowerCase = Object.values(FeedbackCategory).map((c) =>
          c.toLowerCase()
        );

        if (!categoryLowerCase.includes(c?.toLowerCase())) return undefined;
        return c;
      })
    );
  }

  createFeedback(createFeedbackDTO: CreateFeedbackDTO) {
    this._facade.createFeedback(createFeedbackDTO);
  }
}
