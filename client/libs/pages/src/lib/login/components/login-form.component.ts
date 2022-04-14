import { NavigationService } from '@lbk/services';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Credentials } from '@lbk/models';
import { Observable } from 'rxjs';
import { AuthError } from '@lbk/auth';

@Component({
  selector: 'lbk-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  @Input() error!: AuthError | null;
  @Input() pending!: boolean;

  @Output() login = new EventEmitter<Credentials>();

  form!: FormGroup;
  queryParams$!: Observable<{ returnUrl: string | null }>;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      // Username
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],

      // Password
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],

      // Remember me
      rememberMe: [true],
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { username, password } = this.form.value;
    this.login.emit({ username, password });
  }

  get isInvalidCredentials(): boolean {
    return this.error === AuthError.InvalidCredentials;
  }

  get usernameExists(): boolean {
    return (this.form.get('username') as FormControl).hasError(
      'usernameExists'
    );
  }

  goBack() {
    this._navigationService.back();
  }
}
