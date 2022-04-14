import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthFacade } from '@lbk/auth';
import { UpdateUserDTO } from '@lbk/dto';
import { User } from '@lbk/models';
import { NavigationService } from '@lbk/services';
import { DialogService } from '@ngneat/dialog';
import { combineLatest, map, Observable } from 'rxjs';
import { ChangePasswordDialogComponent } from './../components';
import { ProfileFacade } from './../state/profile.facade';

@Component({
  selector: 'lbk-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="cotnainer flex flex-col items-center">
      <div class="max-w-[540px] flow-root pb-20 ">
        <header class="mt-6 md:mt-14">
          <!-- Go Back Button -->
          <button (click)="goBack()" class="btn btn-icon text-stone-500">
            <!--      Arrow Left-->
            <img src="assets/shared/icon-arrow-left.svg" alt="Arrow Left" />
            <!--      end Arrow Left-->

            Go back
          </button>
          <!-- end Go Back Button -->
        </header>

        <lbk-user-form
          [isOwned]="(isOwned$ | async)!"
          [pending]="(pending$ | async)!"
          class="block mt-20 md:mt-24"
          [user]="(user$ | async)!"
          (changePassword)="changePassword()"
          (updateAccount)="updateAccount($event)"
        ></lbk-user-form>
      </div>
    </main>
  `,
})
export class ProfilePageComponent implements OnInit {
  user$!: Observable<User>;
  isOwned$!: Observable<boolean>;
  pending$!: Observable<boolean>;

  constructor(
    private readonly _dialogService: DialogService,
    private readonly _authFacade: AuthFacade,
    private readonly _profileFacade: ProfileFacade,
    private readonly _navigationService: NavigationService
  ) {}

  goBack() {
    this._navigationService.back();
  }

  ngOnInit(): void {
    this.user$ = this._profileFacade.user$ as Observable<User>;

    this.isOwned$ = combineLatest([this._authFacade.user$, this.user$]).pipe(
      map(([me, another]) => {
        return me?.user_id === another?.user_id;
      })
    );
    this.pending$ = this._profileFacade.pending$;
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
