import { Challenge, Solution, CreateSolutionDTO } from '@lbk/fm/shared';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HubFacade } from '../../../facade';

@Component({
  selector: 'lbk-submit-solution-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./submit-solution-page.component.html`,
})
export class SubmitSolutionPageComponent implements OnInit {
  solution$!: Observable<Solution | undefined>;

  constructor(private readonly _hubFacade: HubFacade) {}

  ngOnInit(): void {
    this.solution$ = this._hubFacade.selectedSolution$;
  }

  createSolution(dto: CreateSolutionDTO) {
    this._hubFacade.createSolution(dto);
    return;
  }
}
