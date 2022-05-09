import { Component, OnInit } from '@angular/core';

type HowItWorks = {
  title: string;
  image: string;
  description: string;
};

@Component({
  selector: 'lbk-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent implements OnInit {
  howItWorks!: HowItWorks[];

  ngOnInit(): void {
    this._initHowItWorks();
  }

  private _initHowItWorks() {
    this.howItWorks = [
      // Choose your Challenge
      {
        title: 'Choose your challenge',
        description:
          'Have a look through our collection of web designs. Pick one that you feel will be a nice challenge for you at this stage. ',
        image: 'assets/images/how-it-works/choose-challenge.svg',
      },
      // Code The Design
      {
        title: 'Code the design',
        description:
          "Start the challenge and download all the starter files. We provide all the files you'll need to complete the challenge. Building it is up to you!",
        image: 'assets/images/how-it-works/code.svg',
      },
      // Submit your solution
      {
        title: 'Submit your solution',
        description:
          'Post your solution on the platform for everyone to see and get feedback on your code from other developers in the community.',
        image: 'assets/images/how-it-works/submit.svg',
      },
      // Give others feedback
      {
        title: 'Give others feedback',
        description:
          "Thinking critically about other people's code is a crucial skill. Help others while deepening your own knowledge by giving feedback on solutions.",
        image: 'assets/images/how-it-works/give-feedback.svg',
      },
    ];
  }

  identifyHowItWorks(index: number, howItWorks: HowItWorks) {
    return howItWorks.title;
  }
}
