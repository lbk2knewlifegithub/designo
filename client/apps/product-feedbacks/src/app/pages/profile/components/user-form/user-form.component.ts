import { AvatarInputComponent } from '@lbk/comps';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UpdateUserDTO } from '@lbk/dto';
import { User } from '@lbk/models';
import { UserService } from '@lbk/state/auth';
import { DialogService } from '@ngneat/dialog';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { ProfileFacade } from '../../state';

@Component({
  selector: 'lbk-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  _user!: User;
  @Input() set user(newUser: User) {
    if (newUser !== this.user && !!this.form) {
      this._reset(newUser);
    }

    this._user = newUser;
  }

  get user(): User {
    return this._user;
  }

  _isOwned!: boolean;
  @Input() set isOwned(isOwned: boolean) {
    this._isOwned = isOwned;
    this._updateForm();
  }

  get isOwned() {
    return this._isOwned;
  }

  @ViewChild('avatarInput', { static: true })
  avatarInput!: AvatarInputComponent;

  pending$!: Observable<boolean>;

  @Output() changePassword = new EventEmitter<void>();
  @Output() deleteAccount = new EventEmitter<void>();
  @Output() requestVerifyEmail = new EventEmitter<void>();
  @Output() updateAccount = new EventEmitter<{
    updateUserDTO: UpdateUserDTO;
    avatar?: File;
  }>();

  form!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _dialogService: DialogService,
    private readonly _userService: UserService,
    private readonly _profileFacade: ProfileFacade
  ) {}

  ngOnInit(): void {
    this._initForm();

    this.pending$ = combineLatest([
      this.form.statusChanges.pipe(
        startWith(false),
        map((status) => status === 'PENDING')
      ),
      this._profileFacade.requestingVerifyEmail$,
      this._profileFacade.updatingAccount$,
    ]).pipe(
      map(([formPending, requestVerifyEmail, updatingAcount]) => {
        console.log(formPending, requestVerifyEmail, updatingAcount);
        return formPending || requestVerifyEmail || updatingAcount;
      })
    );

    this._updateForm();
  }

  private _initForm() {
    const {
      firstname,
      lastname,
      username,
      // email
    } = this.user;
    this.form = this._fb.group({
      // First Name
      firstname: [
        firstname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      // Last name
      lastname: [
        lastname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],

      // Username
      username: [
        {
          value: username,
          disabled: true,
        },
      ],
      // Email
      // email: [
      //   email,
      //   [Validators.required, Validators.email],
      //   [this.checkEmailExists()],
      // ],
    });
  }

  onSubmit() {
    const avatar = this.avatarInput.file;
    if (
      !this.form.dirty &&
      !avatar
      // && this.user?.email
    ) {
      this._dialogService.error('Nothing to update');
      return;
    }

    this.form.markAllAsTouched();

    // Check Form Invalid
    if (this.form.invalid) {
      this._dialogService.error('Form is invalid');
      return;
    }

    const {
      firstname,
      lastname,
      // email
    } = this.form.value;
    this.updateAccount.emit({
      updateUserDTO: {
        firstname,
        lastname,
        // email
      },
      avatar,
    });
  }

  checkEmailExists() {
    return (control: AbstractControl) => {
      if (!control.dirty) return of(null);

      return control.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => this._userService.emailExists(value)),
        map((exists: boolean) => (exists ? { emailExists: true } : null)),
        first()
      );
    }; // important to make observable finite
  }

  get emailExists(): boolean {
    const email = this.form.get('email') as FormControl;
    return email.dirty && email.hasError('emailExists');
  }
  cancel() {
    this.form.reset({ ...this.user });
  }

  verifyButtonClick() {
    this.requestVerifyEmail.emit();
  }

  private _updateForm() {
    if (!this.form) return;

    if (this.isOwned && this.form.disabled) return this.form.enable();

    if (!this.isOwned && this.form.enabled) return this.form.disable();
  }

  private _reset(newUser: User) {
    this.form.reset({
      ...newUser,
    });
    this.avatarInput.file = undefined;
  }
}
