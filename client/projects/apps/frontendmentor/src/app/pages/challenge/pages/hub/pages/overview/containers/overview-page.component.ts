import { ChallengesFacade } from '@lbk/fm/state';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Challenge } from '@lbk/fm/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'lbk-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./overview-page.component.html`,
})
export class OverviewPageComponent implements OnInit {
  challenge$!: Observable<Challenge>;

  constructor(private readonly _cf: ChallengesFacade) {}

  ngOnInit(): void {
    this.challenge$ = this._cf.selectedChallenge$ as Observable<Challenge>;
  }
}
