import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthFacade } from '@lbk/auth';
import { User } from '@lbk/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'lbk-profile-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-button.component.html',
})
export class ProfileButtonComponent implements OnInit {
  loggedIn$!: Observable<boolean>;
  user$!: Observable<User>;

  constructor(private readonly _authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.loggedIn$ = this._authFacade.loggedIn$;
    this.user$ = this._authFacade.user$ as Observable<User>;
  }

  onClick() {
    this._authFacade.showProfile();
  }
}
