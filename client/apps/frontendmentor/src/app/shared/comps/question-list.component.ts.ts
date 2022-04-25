import { ZippyModule } from '@lbk/comps';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Question, identifyQuestion } from '../models';

@Component({
  selector: 'lbk-question-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Title -->
    <h3
      *ngIf="title"
      class="uppercase text-center font-bold text-sm tracking-widest md:text-base"
    >
      {{ title }}
    </h3>
    <!-- end Title -->

    <ul class="grid place-items-center gap-1 mt-4 md:gap-2 lg:gap-4 lg:mt-8">
      <li
        class="shadow-sm rounded-lg overflow-hidden max-w-[650px]"
        *ngFor="let question of questions; trackBy: identifyQuestion"
      >
        <lbk-zippy #zippy>
          <button
            zippyToggle
            [style.aria-label]="question.title"
            class="bg-white w-full px-6 py-3 flex items-center border gap-2 focus:border-dotted focus:border-accent focus:border-4 focus:rounded-none md:py-4 md:px-8"
          >
            <!-- Question Title -->
            <h4 class="grow font-medium text-left">
              {{ question.title }}
            </h4>
            <!-- end Question Title -->

            <!-- Minus Or Plus Icon -->
            <i
              [class.fa-minus]="zippy.expanded"
              [class.fa-plus]="!zippy.expanded"
              class="fa-solid text-xl"
            ></i>
            <!-- end Minus Or Plus Icon -->
          </button>

          <!-- Answer -->
          <p
            *zippyContent
            class="bg-white text-sm text-left text-secondary p-6 border border-t-0 md:px-8 md:py-6"
          >
            {{ question.answer }}
          </p>
          <!-- end Answer -->
        </lbk-zippy>
      </li>
    </ul>
  `,
})
export class QuestionListComponent {
  @Input() questions!: Question[];
  @Input() title?: string;
  identifyQuestion = identifyQuestion;
}

@NgModule({
  imports: [CommonModule, ZippyModule],
  exports: [QuestionListComponent],
  declarations: [QuestionListComponent],
})
export class QuestionListModule {}