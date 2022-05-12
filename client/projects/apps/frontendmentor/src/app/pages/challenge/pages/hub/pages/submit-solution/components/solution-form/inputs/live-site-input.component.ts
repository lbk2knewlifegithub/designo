import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-live-site-input',
  template: `
    <div [formGroup]="parent">
      <label>
        <strong class="text-xs md:text-sm">Live Site URL *</strong>
        <p class="text-xs text-secondary italic md:text-sm md:mt-1">
          Read more about our
          <a routerLink="/">recommended free hosting options.</a>
        </p>

        <input formControlName="liveSiteURL" class="w-full mt-1" type="text" />
      </label>

      <!-- Required error  -->
      <span *ngIf="required" class="error">Live site URL is required</span>
      <!-- end Required error  -->

      <!-- URL error  -->
      <span *ngIf="url" class="error"> URL invalid </span>
      <!-- end URL error  -->
    </div>
  `,
})
export class LiveSiteInputComponent {
  @Input() parent!: FormGroup;

  get formControl(): FormControl {
    return this.parent.get('liveSiteURL') as FormControl;
  }

  hasError(error: string): boolean {
    return this.formControl?.touched && this.formControl?.hasError(error);
  }

  get url(): boolean {
    return this.hasError('url');
  }

  get required(): boolean {
    return this.hasError('required');
  }
}
