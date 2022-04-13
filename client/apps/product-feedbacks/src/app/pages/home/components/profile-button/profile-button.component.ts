import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@lbk/models';
import { AuthFacade } from '@lbk/state/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'lbk-profile-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss'],
})
export class ProfileButtonComponent implements OnInit {
  loggedIn$!: Observable<boolean>;
  user$!: Observable<User>;

  constructor(private readonly _authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.loggedIn$ = this._authFacade.loggedIn$;
    this.user$ = this._authFacade.user$ as Observable<User>;
  }

  logout() {
    this._authFacade.logout();
  }
  signup() {
    this._authFacade.signup();
  }

  login() {
    this._authFacade.login();
  }
}
