import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { collapseOut, expandIn } from '@lbk/anims';
import { fromData, Question } from '../../../shared';

@Component({
  selector: 'lbk-faq-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./faq-page.component.html`,
  animations: [expandIn(), collapseOut()],
})
export class FAQPageComponent implements OnInit {
  generalQuestions!: Question[];
  accountQuestions!: Question[];
  subscriptionQuestions!: Question[];
  solutionQuestions!: Question[];
  licensingQuestions!: Question[];

  ngOnInit(): void {
    this.generalQuestions = fromData.generalQuestions;
    this.accountQuestions = fromData.accountQuestions;
    this.subscriptionQuestions = fromData.subscriptionQuestions;
    this.solutionQuestions = fromData.solutionQuestions;
    this.licensingQuestions = fromData.licensingQuestions;
  }
}
