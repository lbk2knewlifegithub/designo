import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeIn, fadeOut } from '@lbk/anims';
import { AuthFacade } from '@lbk/auth';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  animations: [fadeIn(), fadeOut()],
})
export class HeaderComponent implements OnInit {
  shown = false;

  loginGithubURL!: string;
  constructor(private readonly _authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.loginGithubURL = this._authFacade.loginGithubURL;
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
