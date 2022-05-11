import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserFacade } from '@lbk/user';
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

  constructor(private readonly _userFacade: UserFacade) {}

  ngOnInit(): void {
    this.loggedIn$ = this._userFacade.loggedIn$;
    this.user$ = this._userFacade.user$ as Observable<User>;
  }
}
