import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { ZippyModule } from '@lbk/comps';
import {
  accountQuestions,
  challengesQuestions,
  contactQuestions,
  generalQuestions,
  licensingQuestions,
  subscriptionQuestions,
} from '../../data';
import { identifyQuestion, Question } from '../../models';

@Component({
  selector: 'lbk-question-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './question-list.component.html',
})
export class QuestionListComponent implements OnInit {
  static TYPES: { [key: string]: { title: string; questions: Question[] } } = {
    account: {
      title: 'Account',
      questions: accountQuestions,
    },
    contact: {
      title: 'Contact',
      questions: contactQuestions,
    },
    general: {
      title: 'General',
      questions: generalQuestions,
    },
    licensing: {
      title: 'Licensing',
      questions: licensingQuestions,
    },
    challenges: {
      title: 'Challenges FAQS',
      questions: challengesQuestions,
    },
    subscription: {
      title: 'Subscription',
      questions: subscriptionQuestions,
    },
  };

  @Input() questions?: Question[];
  @Input() title?: string;
  @Input() type:
    | 'account'
    | 'contact'
    | 'general'
    | 'licensing'
    | 'solution'
    | 'challenges'
    | 'subscription' = 'general';

  identifyQuestion = identifyQuestion;

  ngOnInit(): void {
    const tmp = QuestionListComponent.TYPES[this.type];
    if (!this.questions) this.questions = tmp.questions;
    if (!this.title) this.title = tmp.title;
  }
}

@NgModule({
  imports: [CommonModule, ZippyModule],
  exports: [QuestionListComponent],
  declarations: [QuestionListComponent],
})
export class QuestionListModule {}
