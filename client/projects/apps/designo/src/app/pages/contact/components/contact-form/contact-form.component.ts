import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'lbk-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    this.form = this._fb.group({
      // Name
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      // Email
      email: ['', [Validators.required, Validators.email]],
      // Phone
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      // Message
      message: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    // Show Dialog Sent message success
    this._dialogService.success({
      title: 'Success',
      body: 'Your message has been sent',
    });

    // Reset Form
    this.form.reset({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  }

  hasError(formControlName: string, error: string): boolean {
    const formControl = this.form.get(formControlName) as FormControl;
    return formControl.touched && formControl.hasError(error);
  }
}
