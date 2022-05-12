import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as fromRXJS from '@lbk/rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'lbk-title-input',
  template: `
    <div [formGroup]="parent">
      <label>
        <strong class="text-xs md:text-sm"> Solution title* </strong>
        <p class="text-xs text-secondary italic md:text-sm md:mt-1">
          Include some of the tools and techniques you used to complete the
          challenge.
        </p>

        <input
          formControlName="title"
          class="w-full mt-1"
          placeholder="e.g. Responsive landing page using CSS Grid"
          type="text"
        />

        <!-- Maxlength error  -->
        <span *ngIf="maxlength; else remain" class="error"
          >Title maxlength is 70 characters</span
        >
        <!-- end maxlength error  -->

        <ng-template #remain>
          <p class="text-right text-xs mt-1">
            Characters remaining :
            <strong>{{ charactersLeft$ | async }}</strong>
          </p>
        </ng-template>
      </label>

      <!-- Required error  -->
      <span *ngIf="required" class="error">Title is required</span>
      <!-- end Required error  -->
    </div>
  `,
})
export class TitleInputComponent implements OnInit {
  charactersLeft$!: Observable<string>;
  @Input() parent!: FormGroup;

  ngOnInit(): void {
    this.charactersLeft$ = fromRXJS.charactersLeft$(this.formControl, 70);
  }

  hasError(error: string): boolean {
    return this.formControl?.touched && this.formControl?.hasError(error);
  }

  get formControl(): FormControl {
    return this.parent.get('title') as FormControl;
  }

  get required(): boolean {
    return this.hasError('required');
  }

  get maxlength(): boolean {
    return this.hasError('maxlength');
  }
}
