import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserFacade } from '@lbk/user';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  loginGithubURL!: string;
  constructor(private _userFacade: UserFacade) {}

  ngOnInit() {
    this.loginGithubURL = this._userFacade.loginGithubURL;
  }
}
