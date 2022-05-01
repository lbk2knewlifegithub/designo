import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChallengesFacade } from '../../../state';

@Component({
  selector: 'lbk-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  constructor(private readonly _challengesFacade: ChallengesFacade) {}

  ngOnInit(): void {
    this._challengesFacade.loadChallenges();
  }
}
