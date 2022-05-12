import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-tags-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [formGroup]="parent">
      <label>
        <strong class="text-xs md:text-sm">Tags</strong>
        <p class="text-xs text-secondary italic md:text-sm md:mt-1">
          Add up to 5 tags. Don't see the tag you want? Request it by emailing
          <a routerLink="/">hi@frontendmentor.io.</a>
        </p>

        <!-- [ngClass]="{ 'is-invalid': itemForm.get('supplier').invalid && itemForm.get('supplier').touched }"  -->
        <ng-select
          class="custom"
          [multiple]="true"
          placeholder="Please select ..."
          formControlName="tags"
        >
          <ng-option *ngFor="let tag of tags" [value]="tag">
            {{ tag }}
          </ng-option>
        </ng-select>
      </label>
    </div>
  `,
  styles: [
    `
      .ng-select.custom .ng-select-container {
        border: 1px solid black !important;
        padding: 0.2rem 0.3rem !important;
        border-radius: 0;
      }
    `,
  ],
})
export class TagsComponent {
  @Input() parent!: FormGroup;
  selectedCar?: number;

  tags = ['angular', 'vue', 'react', 'svelte'];
}
