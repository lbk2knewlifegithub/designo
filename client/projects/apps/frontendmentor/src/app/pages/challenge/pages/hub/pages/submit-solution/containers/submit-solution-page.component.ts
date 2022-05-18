import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SolutionDTO, Tag, Solution } from '@lbk/fm/shared';
import { TagsFacade } from '@lbk/fm/state';
import { Observable } from 'rxjs';
import { HubFacade } from '../../../facade';

@Component({
  selector: 'lbk-submit-solution-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./submit-solution-page.component.html`,
})
export class SubmitSolutionPageComponent implements OnInit {
  solution$!: Observable<Solution | undefined>;
  tags$!: Observable<Tag[]>;
  submitingSolution$!: Observable<boolean>;
  updatingSolution$!: Observable<boolean>;

  constructor(
    private readonly _hubFacade: HubFacade,
    private readonly _tagFacade: TagsFacade
  ) {}

  ngOnInit(): void {
    this.solution$ = this._hubFacade.selectedSolution$;
    this.tags$ = this._tagFacade.tags$;
    this.submitingSolution$ = this._hubFacade.submtingSolution$;
    this.updatingSolution$ = this._hubFacade.updatingSolution$;

    this._tagFacade.loadTags();
  }

  deleteSolution(solutionID: string) {
    this._hubFacade.deleteSolution(solutionID);
  }

  createSolution(dto: SolutionDTO) {
    this._hubFacade.createSolution(dto);
  }

  updateSolution(dto: SolutionDTO) {
    this._hubFacade.updateSolution(dto);
  }
}
