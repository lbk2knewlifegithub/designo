import { OnInit } from '@angular/core';
import { SolutionsFacade } from '@lbk/fm/state';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Solution } from '@lbk/fm/shared';

@Component({
  selector: 'lbk-solution-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./solution-page.component.html`,
})
export class SolutionPageComponent implements OnInit {
  solution$!: Observable<Solution>;

  constructor(private readonly _solutionsFacade: SolutionsFacade) {}

  ngOnInit(): void {
    this.solution$ = this._solutionsFacade
      .selectedSolution$ as Observable<Solution>;
  }
}
