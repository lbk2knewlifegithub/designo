import { ChallengesFacade } from '@lbk/fm/state';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck } from 'rxjs';
import { Challenge } from '@lbk/fm/shared';

@Component({
  selector: 'lbk-challenge-details-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./challenge-details-page.component.html`,
})
export class ChallengeDetailsPageComponent implements OnInit {
  challenge$!: Observable<Challenge>;

  constructor(private readonly _cf: ChallengesFacade) {}

  ngOnInit(): void {
    this.challenge$ = this._cf.selectedChallenge$ as Observable<Challenge>;
  }
}
