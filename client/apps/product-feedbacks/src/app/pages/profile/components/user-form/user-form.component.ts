import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvatarInputComponent } from '@lbk/comps';
import { UpdateUserDTO } from '@lbk/dto';
import { User } from '@lbk/models';
import { DialogService } from '@ngneat/dialog';

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

  _pending!: boolean;
  @Input() set pending(pending: boolean) {
    this._pending = pending;
    this._updateForm();
  }
  get pending() {
    return this._pending;
  }

  @Output() changePassword = new EventEmitter<void>();
  @Output() updateAccount = new EventEmitter<{
    updateUserDTO: UpdateUserDTO;
    avatar?: File;
  }>();

  form!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this._initForm();
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
    });
  }

  onSubmit() {
    const avatar = this.avatarInput.file;
    if (!this.form.dirty && !avatar) {
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
  cancel() {
    this.form.reset({ ...this.user });
  }

  private _updateForm() {
    if (!this.form) return;

    if ((this.isOwned || !this.pending) && this.form.disabled)
      return this.form.enable();

    if ((!this.isOwned || this.pending) && this.form.enabled)
      return this.form.disable();
  }

  private _reset(newUser: User) {
    this.form.reset({
      ...newUser,
    });
    this.avatarInput.file = undefined;
  }
}
