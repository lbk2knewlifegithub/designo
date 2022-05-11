import { DialogService } from '@ngneat/dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfirmDeleteAccountDialog } from '../components';
import { take } from 'rxjs';
import { UserFacade } from '@lbk/user';

@Component({
  selector: 'lbk-account-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./account-page.component.html`,
})
export class AccountPageComponent {
  constructor(
    private readonly _dialogService: DialogService,
    private readonly _userFacade: UserFacade
  ) {}

  deleteAccount() {
    this._dialogService
      .open(ConfirmDeleteAccountDialog)
      .afterClosed$.pipe(take(1))
      .subscribe((confirm) => {
        if (!confirm) return;
        this._userFacade.deleteAccount();
      });
  }
}
