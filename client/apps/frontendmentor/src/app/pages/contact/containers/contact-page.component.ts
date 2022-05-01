import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromData, Question } from '../../../shared';

@Component({
  selector: 'lbk-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-page.component.html',
})
export class ContactPageComponent implements OnInit {
  contactQuestions!: Question[];

  ngOnInit(): void {
    this.contactQuestions = fromData.contactQuestions;
  }
}
