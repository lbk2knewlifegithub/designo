import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable } from 'rxjs';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'lbk-password-input',
  template: `
    <div class="form-control" [formGroup]="parent">
      <label [for]="controlName" class="label label-text"> {{ label }} </label>

      <div class="relative">
        <input
          [id]="controlName"
          [formControlName]="controlName"
          [type]="shown ? 'text' : 'password'"
          class="input input-bordered"
        />

        <!-- Eye -->
        <button
          type="button"
          (click)="toggleShown()"
          aria-label="Show Password"
          class="absolute top-1/2  -translate-y-1/2 right-4"
        >
          <i [class]="passwordIcon" class="fa-solid "></i>
        </button>
        <!-- end Eye -->
      </div>

      <!-- Errors -->
      <p *ngIf="same$ | async" class="error">Not same with old password.</p>
      <p *ngIf="required" class="error">Password is requried.</p>

      <p *ngIf="minlength" class="error">Password must at least 8 chracters</p>

      <p *ngIf="maxlength" class="error">Password max length is 50 chracters</p>
      <!-- end Errors -->
    </div>
  `,
})
export class PasswordInputComponent extends InputComponent implements OnInit {
  shown = false;
  override controlName = 'password';
  @Input() notSameWith?: string;

  same$!: Observable<boolean>;

  ngOnInit(): void {
    if (this.notSameWith) {
      const noSameWithFC = this.parent.get(this.notSameWith) as FormControl;
      this.same$ = combineLatest([
        this.formControl.valueChanges,
        noSameWithFC.valueChanges,
      ]).pipe(map(([password, another]) => password === another));
    }
  }

  toggleShown() {
    this.shown = !this.shown;
  }

  get passwordIcon() {
    return this.shown ? 'fa-eye-slash' : 'fa-eye';
  }
}
