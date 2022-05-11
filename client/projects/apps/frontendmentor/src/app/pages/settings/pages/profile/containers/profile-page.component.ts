import { OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@lbk/models';
import { UserFacade } from '@lbk/user';
import { UpdateUserDTO } from '@lbk/dto';
import { UserFormComponent } from '../components/user-form.component';

@Component({
  selector: 'lbk-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./profile-page.component.html`,
})
export class ProfilePageComponent implements OnInit {
  user$!: Observable<User>;
  updatingProfile$!: Observable<boolean>;
  @ViewChild('userForm', { static: true }) userForm!: UserFormComponent;

  constructor(private readonly _userFacade: UserFacade) {}

  ngOnInit(): void {
    this.user$ = this._userFacade.user$ as Observable<User>;
    this.updatingProfile$ = this._userFacade.updatingProfile$;
  }

  /**
   * - Update Profile
   * @param payload -
   */
  updateProfile(payload: { updateUserDTO: UpdateUserDTO; avatar?: File }) {
    const { updateUserDTO, avatar } = payload;
    this._userFacade.updateProfile(updateUserDTO, avatar);
  }
}
