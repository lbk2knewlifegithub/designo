import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { MarkdownGuideComponent } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import * as fromRXJS from '@lbk/rxjs';

@Component({
  selector: 'lbk-questions-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <label>
        <strong class="text-xs md:text-sm">Question for the community</strong>

        <div class="text-xs text-secondary italic md:text-sm md:mt-2">
          <p>
            Please ensure you add specific questions you'd like people to answer
            if you want feedback. Specific questions are more likely to receive
            helpful feedback than general statements like "Feedback welcome".
            Things to consider when asking for specific feedback include:
          </p>
          <ul class="list-inside list-disc mt-2 pr-5 md:mt-4 md:pl-10">
            <li>What did you find difficult while building the project?</li>
            <li>Which areas of your code are you unsure of?</li>
            <li>Do you have any questions about best practices?</li>
          </ul>
        </div>

        <!-- Questions Input -->
        <div class="relative">
          <button
            type="button"
            (click)="showMarkdownGuide()"
            class="absolute top-0 right-0 -translate-y-[70%]"
            aria-label="Open markdown syntax helper guide"
          >
            <i class="fa-solid fa-keyboard text-lg"></i>
          </button>
          <!-- end Open markdown guide -->

          <textarea
            formControlName="questions"
            class="w-full p-4 mt-2"
            rows="10"
          ></textarea>
        </div>
        <!-- end Questions Input -->

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
    </div>
  `,
})
export class QuestionsInputComponent implements OnInit {
  @Input() parent!: FormGroup;
  charactersLeft$!: Observable<string>;

  constructor(private readonly _ds: DialogService) {}

  ngOnInit(): void {
    this.charactersLeft$ = fromRXJS.charactersLeft$(this.formControl, 500);
  }

  /**
   * - Show Markdown Guide
   */
  showMarkdownGuide() {
    this._ds.open(MarkdownGuideComponent);
  }

  hasError(error: string): boolean {
    return this.formControl?.touched && this.formControl?.hasError(error);
  }

  get formControl(): FormControl {
    return this.parent.get('questions') as FormControl;
  }

  get maxlength(): boolean {
    return this.hasError('maxlength');
  }
}
