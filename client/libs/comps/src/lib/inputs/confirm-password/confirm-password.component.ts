import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable } from 'rxjs';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'lbk-confirm-password-input',
  template: `
    <div class="form-control" [formGroup]="parent">
      <label [for]="controlName" class="label label-text">
        Confirm Password
      </label>

      <div class="relative">
        <input
          [id]="controlName"
          formControlName="confirmPassword"
          [type]="shown ? 'text' : 'password'"
          class="input input-bordered"
        />

        <!--  Eye -->
        <button
          type="button"
          (click)="toggleShown()"
          aria-label="Show Password"
          class="absolute top-1/2  -translate-y-1/2 right-4"
        >
          <i [class]="passwordIcon" class="fa-solid"></i>
        </button>
        <!-- end  Eye -->
      </div>

      <!-- Errors -->
      <p *ngIf="required" class="error">Confirm Password is requried.</p>

      <p *ngIf="minlength" class="error">
        Confirm Password must at least 8 chracters
      </p>

      <p *ngIf="maxlength" class="error">
        Confirm Password max length is 50 chracters
      </p>

      <p *ngIf="noMatches$ | async" class="error">
        Confirm Password must same with new password.
      </p>
      <!-- end Errors -->
    </div>
  `,
  styles: [
    `
      input.ng-invalid.ng-touched {
        @apply border-2 border-red-500;
      }

      .error {
        @apply text-red-500 font-bold italic text-xs;
      }
    `,
  ],
})
export class ConfirmPasswordInputComponent
  extends InputComponent
  implements OnInit
{
  override controlName = 'confirmPassword';
  @Input() target = 'password';

  noMatches$!: Observable<boolean>;
  shown = false;

  toggleShown() {
    this.shown = !this.shown;
  }

  get passwordIcon() {
    return this.shown ? 'fa-eye-slash' : 'fa-eye';
  }

  ngOnInit(): void {
    this.noMatches$ = combineLatest([
      this.formControl.valueChanges,
      this.password.valueChanges,
    ]).pipe(map(([confirmPassword, password]) => confirmPassword !== password));
  }

  get password(): FormControl {
    return this.parent.get(this.target) as FormControl;
  }
}
