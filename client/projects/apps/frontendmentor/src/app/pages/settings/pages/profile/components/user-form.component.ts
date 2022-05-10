import { UpdateUserDTO } from '@lbk/dto';
import { OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as MyValidators from '@lbk/validators';
import {
  ChangeDetectionStrategy,
  EventEmitter,
  Component,
  Input,
} from '@angular/core';
import { User } from '@lbk/models';
import { DialogService } from '@ngneat/dialog';
import { AvatarInputComponent } from '@lbk/comps';

@Component({
  selector: 'lbk-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./user-form.component.html`,
})
export class UserFormComponent implements OnInit {
  @Input() user!: User;
  @Input() pending!: boolean | undefined | null;
  @Output() update = new EventEmitter<{
    updateUserDTO: UpdateUserDTO;
    avatar?: File;
  }>();

  @ViewChild('avatarInput', { static: true })
  avatarInput!: AvatarInputComponent;
  form!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _ds: DialogService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    const {
      name,
      email,
      location,
      isHireMe,
      bio: { website, currentLearning, content: bio },
      links: {
        github,
        twitter,
        devTo,
        hashnode,
        codepen,
        twitch,
        stackOverFlow,
        gitlab,
        freeCodeCamp,
        medium,
        linkedIn,
        youtube,
        codewars,
      },
    } = this.user;
    this.form = this._fb.group({
      name: [name, [Validators.required, Validators.maxLength(50)]],
      email: [email, [Validators.required, Validators.email]],
      location: [location, [Validators.required, Validators.maxLength(50)]],
      isHireMe: [!!isHireMe],
      // BIO
      bio: this._fb.group({
        content: [bio],
        website: [website, [MyValidators.URL]],
        currentLearning: [currentLearning],
      }),
      // Links
      links: this._fb.group({
        github: [github, [MyValidators.URL]],
        twitter: [twitter, [MyValidators.URL]],
        devTo: [devTo, [MyValidators.URL]],
        hashnode: [hashnode, [MyValidators.URL]],
        codepen: [codepen, [MyValidators.URL]],
        twitch: [twitch, [MyValidators.URL]],
        stackOverFlow: [stackOverFlow, [MyValidators.URL]],
        gitlab: [gitlab, [MyValidators.URL]],
        freeCodeCamp: [freeCodeCamp, [MyValidators.URL]],
        medium: [medium, [MyValidators.URL]],
        linkedIn: [linkedIn, [MyValidators.URL]],
        youtube: [youtube, [MyValidators.URL]],
        codewars: [codewars, [MyValidators.URL]],
      }),
    });

    this.form.valueChanges.subscribe(console.log);
  }

  onSubmit() {
    if (!this.form.dirty) this.form.markAllAsTouched();

    if (this.form.value == this.user) {
      return this._ds.error('Nothing changed');
    }

    const avatar = this.avatarInput.file;

    if (this.form.invalid) {
      return this._ds.error({
        title: 'Form is invalid',
        body: 'Please check your form and try again',
      });
    }

    const updateUserDTO = this.form.value as UpdateUserDTO;
    return this.update.emit({ updateUserDTO, avatar });
  }
}
