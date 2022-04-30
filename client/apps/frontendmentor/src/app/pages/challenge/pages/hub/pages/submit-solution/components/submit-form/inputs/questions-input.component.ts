import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { MarkdownGuideComponent } from '../../markdown-guide/markdown-guide.component';

@Component({
  selector: 'lbk-questions-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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

      <div class="relative">
        <!-- Open markdown guide -->
        <button
          type="button"
          (click)="showMarkdownGuide()"
          class="absolute top-0 right-0 -translate-y-[70%]"
          aria-label="Open markdown syntax helper guide"
        >
          <i class="fa-solid fa-keyboard text-lg"></i>
        </button>
        <!-- end Open markdown guide -->

        <textarea class="w-full p-4 mt-2" rows="10"></textarea>
      </div>
    </label>
  `,
})
export class QuestionsInputComponent {
  constructor(private readonly _dialogService: DialogService) {}

  /**
   * - Show Markdown Guide
   */
  showMarkdownGuide() {
    this._dialogService.open(MarkdownGuideComponent);
  }
}
