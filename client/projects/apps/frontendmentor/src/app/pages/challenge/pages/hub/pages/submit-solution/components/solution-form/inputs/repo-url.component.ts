import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'lbk-repo-url-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <label>
        <strong class="text-xs md:text-sm">Repository URL *</strong>
        <input formControlName="repoURL" class="w-full mt-1" type="text" />
      </label>

      <!-- Required error  -->
      <span *ngIf="required" class="error">Repo URL is required</span>
      <!-- end Required error  -->

      <!-- URL error  -->
      <span *ngIf="url" class="error"> URL invalid </span>
      <!-- end URL error  -->
    </div>
  `,
})
export class RepoURLInputComponent {
  @Input() parent!: FormGroup;

  get formControl(): FormControl {
    return this.parent.get('repoURL') as FormControl;
  }

  hasError(error: string): boolean {
    return this.formControl?.touched && this.formControl?.hasError(error);
  }

  get required(): boolean {
    return this.hasError('required');
  }

  get url(): boolean {
    return this.hasError('url');
  }
}
