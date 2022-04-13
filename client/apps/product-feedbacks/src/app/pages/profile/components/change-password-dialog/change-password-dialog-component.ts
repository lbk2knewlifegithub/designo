import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscribe } from '@lbk/comps';
import { AuthApiActions, AuthFacade } from '@lbk/state/auth';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

@Component({
  selector: 'lbk-change-password-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './change-password-dialog.component.html',
})
export class ChangePasswordDialogComponent
  extends UnSubscribe
  implements OnInit, OnDestroy
{
  form!: FormGroup;
  pending$!: Observable<boolean>;

  constructor(
    private readonly _dialogService: DialogService,
    private readonly _ref: DialogRef,
    private readonly _authFacade: AuthFacade,
    private readonly _actions$: Actions
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this._initForm();
    this.pending$ = this._authFacade.pending$;

    this.appendSub = this.pending$.subscribe((pending) => {
      if (pending) return this.form.disable();
      return this.form.enable();
    });
  }

  private _initForm() {
    this.form = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });
  }

  /**
   * - Submit Form
   */
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { newPassword, oldPassword } = this.form.value;
    this._authFacade.changePassword({ newPassword, oldPassword });

    this.appendSub = this._actions$
      .pipe(ofType(AuthApiActions.changePasswordSuccess))
      .subscribe(() => {
        this.close();
      });
  }

  /**
   * - Old Password Incorrect
   */
  oldPasswordIncorrect() {
    this._dialogService.error({
      title: 'Please try again',
      body: 'Your old password incorrect',
    });
  }

  /**
   * - Close Dialog
   */
  close() {
    this._ref.close();
    this.form.reset({
      newPassword: '',
      oldPassword: '',
      confirmPasssword: '',
    });
  }
}
