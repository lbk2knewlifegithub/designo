import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { CLIENT_PRODUCT_FEEDBACK_URL } from '@lbk/tokens';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { zoomIn } from '@lbk/anims';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { RouteFacade } from './../../../shared/route.facade';
import { SignUpFacade } from './../state';

@Component({
  selector: 'lbk-signup-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup-form.component.html',
  animations: [zoomIn({ delay: 3000 })],
})
export class SignupFormComponent implements OnInit {
  @Input() error!: string;
  @Input() pending!: boolean;

  form!: FormGroup;
  isCheckingUsername = true;
  queryParams$!: Observable<{ returnUrl: string | null }>;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _facade: SignUpFacade,
    private readonly _routeFacade: RouteFacade,
    @Inject(CLIENT_PRODUCT_FEEDBACK_URL)
    readonly clientProductFeedbacksUrl: string
  ) {}

  ngOnInit(): void {
    this.queryParams$ = this._routeFacade.queryParamsWithReturnUrl$;

    this.form = this._fb.group({
      // First Name
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      // Last name
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],

      // Username
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
        [this.checkUsernameExists()],
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

      // Confirm password
      confirmPassword: [
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

  onSubmit(avatar?: File) {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { firstname, lastname, username, password } = this.form.value;

    this._facade.signUp(
      {
        firstname,
        lastname,
        username,
        password,
      },
      avatar
    );
  }

  checkUsernameExists() {
    return (control: AbstractControl) =>
      control.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => this._facade.isUsernameUnique(value)),
        map((exists: boolean) => (exists ? { usernameExists: true } : null)),
        first()
      ); // important to make observable finite
  }

  get usernameExists(): boolean {
    return (this.form.get('username') as FormControl).hasError(
      'usernameExists'
    );
  }
}
