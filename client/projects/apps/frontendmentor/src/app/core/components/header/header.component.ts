import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeIn, fadeOut } from '@lbk/anims';
import { UserFacade } from '@lbk/user';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  animations: [fadeIn(), fadeOut()],
})
export class HeaderComponent implements OnInit {
  shown = false;

  loginGithubURL!: string;
  constructor(private readonly _userFacade: UserFacade) {}

  ngOnInit(): void {
    this.loginGithubURL = this._userFacade.loginGithubURL;
  }

  toggle() {
    this.shown = !this.shown;
  }

  close() {
    this.shown = false;
  }

  open() {
    this.shown = true;
  }
}
