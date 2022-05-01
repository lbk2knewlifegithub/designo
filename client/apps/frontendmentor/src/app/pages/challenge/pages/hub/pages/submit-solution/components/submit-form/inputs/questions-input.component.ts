import { ChangeDetectionStrategy, Component } from '@angular/core';

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

      <lbk-add-comment-input></lbk-add-comment-input>
    </label>
  `,
})
export class QuestionsInputComponent {}
