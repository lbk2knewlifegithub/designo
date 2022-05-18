import { Solution } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import { SolutionsFacade } from '@lbk/fm/state';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbk-solutions-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./solutions-page.component.html`,
  styles: [
    `
      a.active {
        @apply border-b-2 border-primary md:border-b-4;
      }
    `,
  ],
})
export class SolutionsPageComponent implements OnInit {
  solutions$!: Observable<Solution[]>;
  constructor(private readonly _solutionsFacade: SolutionsFacade) {}

  ngOnInit(): void {
    this.solutions$ = this._solutionsFacade.allSolutions$;
    this._solutionsFacade.loadSolutions();
  }
}
