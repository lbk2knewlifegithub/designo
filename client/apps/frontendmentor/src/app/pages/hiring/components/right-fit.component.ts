import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface RightFit {
  title: string;
  description: string;
}
@Component({
  selector: 'lbk-right-fit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <div
        class="rounded-lg overflow-hidden border bg-white p-4 pt-12 pb-10 md:px-7 md:pt-14 "
      >
        <h3 class="font-black text-center text-sm tracking-widest">
          ARE WE THE RIGHT FIT?
        </h3>

        <ul class="w-full grid gap-12 mt-6 md:gap-20">
          <ng-container *ngFor="let rightFit of rightFitList; index as i">
            <li
              [ngClass]="{ 'border-t': i !== 0 }"
              class="border-t pt-8 grid gap-4 md:grid-cols-3 md:pt-12"
            >
              <!-- Hiring Title -->
              <h2 class="text-2xl font-medium">{{ rightFit.title }}</h2>
              <!-- end Hiring Title -->

              <!-- Description -->
              <p class="md:col-span-2" [innerHtml]="rightFit.description"></p>
              <!-- end Description -->
            </li>
          </ng-container>
        </ul>
      </div>
    </section>
  `,
})
export class RightFitComponent implements OnInit {
  rightFitList!: RightFit[];

  ngOnInit(): void {
    this._initRightFitList();
  }
  private _initRightFitList() {
    this.rightFitList = [
      {
        title: 'Types of roles',
        description: `The majority of our community have 0-2 years of professional experience as a developer. So you’ll have the most choice if you’re hiring for junior roles. However, we do have plenty of more experienced developers in our community actively looking for work.<br><br>
        If you are hiring juniors, we ask that you can provide suitable training and support for them.<br><br>
        Although we have full-stack projects on the site, we’re best suited for you if you’re looking to hire front-end developers.`,
      },

      {
        title: 'Hiring Strategy',
        description: `The developers on Frontend Mentor come from many different countries and backgrounds. They also have a wide array of educational and work histories. We want to provide inclusive opportunities for our community members. Therefore, we ask you to review a candidate’s potential based on their proof of work and give everyone a fair chance.<br><br>
         We also recommend being open and transparent about salary ranges and what to expect during your interview process. Defaulting to transparency wherever possible can save a lot of time on both sides and ease many concerns a candidate might have.`,
      },

      {
        title: 'Interview Process',
        description: `Using our hiring platform provides an opportunity to condense your interview process, saving you time and money.<br><br> 
        Before contacting a candidate, you can check their coding skills, code reviews, communication style, and written communication skills. Having so much initial context could even allow you to bypass the initial phone screen and technical test.<br><br> 
        One option we’ve seen work for companies is to pick some recent projects a candidate has completed. Then, set up a call where the candidate talks through their code, and you can discuss their decisions and any changes they’d make. This change removes a lot of pressure on the candidate’s side while saving time for you and your team.<br><br>
         If you decide to continue with a take-home technical test, consider using one of our challenges for the assignment.`,
      },
    ];
  }
}
