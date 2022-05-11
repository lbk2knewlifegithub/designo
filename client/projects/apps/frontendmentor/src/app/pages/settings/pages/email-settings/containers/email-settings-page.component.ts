import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmailSettings, User } from '@lbk/models';
import { UserFacade } from '@lbk/user';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'lbk-email-settings-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./email-settings-page.component.html`,
})
export class EmailSettingsPageComponent implements OnInit {
  emailSettings$!: Observable<EmailSettings>;
  updatingEmailSettings$!: Observable<boolean>;

  constructor(private readonly _userFacade: UserFacade) {}

  ngOnInit(): void {
    this.emailSettings$ = (this._userFacade.user$ as Observable<User>).pipe(
      map((user) => user.emailSettings)
    );
    this.updatingEmailSettings$ = this._userFacade.updatingEmailSettings$;
  }

  updateEmailSettings(emailSettings: EmailSettings) {
    this._userFacade.updateEmailSettings(emailSettings);
  }
}
