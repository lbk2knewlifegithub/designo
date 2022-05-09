import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { zoomIn } from '@lbk/anims';
import { UserService } from '@lbk/auth';
import { CreateUserDTO } from '@lbk/dto';
import { NavigationService } from '@lbk/services';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'lbk-signup-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup-form.component.html',
  animations: [zoomIn({ delay: 3000 })],
})
export class SignupFormComponent implements OnInit {
  @Input() error!: string;
  @Input() pending!: boolean;
  @Output() signup = new EventEmitter<{
    createUserDTO: CreateUserDTO;
    avatar?: File;
  }>();

  form!: FormGroup;
  isCheckingUsername = true;
  queryParams$!: Observable<{ returnUrl: string | null }>;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _navigationService: NavigationService,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  _initForm() {
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

    this.signup.emit({
      createUserDTO: {
        firstname,
        lastname,
        username,
        password,
      },
      avatar,
    });
  }

  checkUsernameExists() {
    return (control: AbstractControl) =>
      control.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => this._userService.usernameExists(value)),
        map((exists: boolean) => (exists ? { usernameExists: true } : null)),
        first()
      ); // important to make observable finite
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
