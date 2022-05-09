import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthFacade } from '@lbk/auth';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  loginGithubURL!: string;
  constructor(private _authFacade: AuthFacade) {}

  ngOnInit() {
    this.loginGithubURL = this._authFacade.loginGithubURL;
  }
}
