import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FeedbackCategory } from '../../../models';

@Component({
  selector: 'lbk-category-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <h4>Category</h4>
      <span class="text-neutral text-xs"
        >Choose a category for your feedback</span
      >

      <select formControlName="category">
        <option
          *ngFor="let category of categories"
          [ngValue]="category | lowercase"
        >
          {{ category | upper: 2 }}
        </option>
      </select>
    </div>
  `,
})
export class CategoryInputComponent implements OnInit {
  @Input() parent!: FormGroup;
  categories!: FeedbackCategory[];

  ngOnInit(): void {
    this.categories = Object.values(FeedbackCategory);
  }
}
