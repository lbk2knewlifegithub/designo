import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UpdateUserDTO } from '@lbk/dto';
import { User } from '@lbk/models';
import { AuthFacade } from '@lbk/state/auth';
import { DialogService } from '@ngneat/dialog';
import { Observable } from 'rxjs';
import { ChangePasswordDialogComponent } from './../components';

@Component({
  selector: 'lbk-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="cotnainer flex flex-col items-center">
      <div class="max-w-[540px] flow-root pb-20 ">
        <header class="mt-6 md:mt-14">
          <lbk-go-back></lbk-go-back>
        </header>

        <lbk-user-form
          class="block mt-20 md:mt-24"
          [user]="(user$ | async)!"
          (changePassword)="changePassword()"
          (updateAccount)="updateAccount($event)"
          (requestVerifyEmail)="requestVerifyEmail()"
        ></lbk-user-form>
      </div>
    </main>
  `,
})
export class ProfilePageComponent implements OnInit {
  user$!: Observable<User>;

  constructor(
    private readonly _dialogService: DialogService,
    private readonly _authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.user$ = this._authFacade.user$ as Observable<User>;
  }

  changePassword() {
    this._dialogService.open(ChangePasswordDialogComponent, {
      enableClose: false,
      closeButton: false,
    });
  }

  updateAccount(data: { updateUserDTO: UpdateUserDTO; avatar?: File }) {
    const { updateUserDTO, avatar } = data;
    this._authFacade.updateAccount(updateUserDTO, avatar);
  }

  requestVerifyEmail() {
    this._authFacade.requestVerifyEmail();
  }
}