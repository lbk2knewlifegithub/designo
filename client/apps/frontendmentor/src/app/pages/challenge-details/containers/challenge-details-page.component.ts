import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck } from 'rxjs';
import { Challenge, Question } from '../../../shared';

@Component({
  selector: 'lbk-challenge-details-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./challenge-details-page.component.html`,
})
export class ChallengeDetailsPageComponent implements OnInit {
  challenge$!: Observable<Challenge>;
  questions!: Question[];

  constructor(private readonly _route: ActivatedRoute) {}
  ngOnInit(): void {
    this.challenge$ = this._route.data.pipe(pluck('challenge'));
    this._initQuestions();
  }

  private _initQuestions() {
    this.questions = [
      {
        title: "How can I get help if I'm stuck on a challenge?",
        answer: `The best (and quickest) way to get help on a challenge is in our Slack community. There are thousands of other developers in there, so it's a great place to ask questions. We even have a dedicated “help” channel! If you haven't joined yet, you can get an invite to our Slack community here.`,
      },

      {
        title: 'Can I use these projects in my portfolio?',
        answer: `Definitely! Please do feel free to use whatever you build in your portfolio. Helping developers add professional-looking projects to their portfolio was one of the reasons we created this platform!`,
      },

      {
        title: 'Is there an official solution I can take a look at?',
        answer: `We don't provide “official” solutions for the challenges. This is because there is no single perfect way to complete a challenge. Instead, you're encouraged to review other people's code in the community. You can learn so much by seeing how other people have approached the same challenges and giving them feedback.`,
      },

      {
        title: 'Do I get a code review when I post my solution?',
        answer: `Frontend Mentor is a collaborative learning community where everyone can give feedback to each other. If you'd like to receive feedback from the community, please be sure to post a question when you submit your solution. The more specific you can be, the better. Being clear with your questions means you're much more likely to receive valuable feedback from others.`,
      },

      {
        title: 'How do I submit my solution?',
        answer: `We'd recommend reading our complete guide to submitting solutions. If you get stuck and need help, please feel free to ask questions in our Slack community, and we'll help you submit your project`,
      },

      {
        title:
          'Can I use these challenges within my own free or commercial content/tutorials/projects?',
        answer: `Please visit our license page to learn more about how our challenges can be used within your own content. If you're unsure about anything, please feel free to contact us at <a>hi@frontendmentor.io</a>   and we'll be more than happy to answer your questions.`,
      },
    ];
  }
}
