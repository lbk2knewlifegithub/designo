import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface Hiring {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'lbk-hiring-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll">
      <ul class="grid gap-28 md:gap-20 lg:gap-16">
        <ng-container *ngFor="let hiring of hiringList; index as i">
          <li
            class="grid grid-cols-2 place-items-center gap-16 md:grid-col-2 md:gap-10"
          >
            <!-- Hiring Illustration -->
            <div
              [ngClass]="{ 'md:order-last': i % 2 !== 0 }"
              class="max-w-[396px] md:max-w-[560px]"
            >
              <img [src]="hiring.image" [alt]="hiring.title" />
            </div>
            <!-- end Hiring Illustration -->

            <div
              class="max-w-[475px] relative text-center md:min-w-[350px] md:text-left md:!w-full"
            >
              <!-- Index -->
              <span
                class="absolute z-[-1] opacity-40 font-bold font-heading text-[7.5rem] text-secondary top-0 left-1/2 -translate-y-1/2  -translate-x-1/2 md:left-[30%]"
                >{{ i + 1 }}</span
              >
              <!-- end Index -->

              <!-- Hiring Title -->
              <h2 class="text-3xl text-[36px] font-medium lg:text-[42px]">
                {{ hiring.title }}
              </h2>
              <!-- end Hiring Title -->

              <!-- Description -->
              <p class="mt-4 md:text-lg md:mt-8">{{ hiring.description }}</p>
              <!-- end Description -->
            </div>
          </li>
        </ng-container>
      </ul>
    </section>
  `,
})
export class HiringListComponent implements OnInit {
  hiringList!: Hiring[];

  ngOnInit(): void {
    this._initHiringList();
  }

  private _initHiringList() {
    this.hiringList = [
      {
        title: 'Powerful talent search',
        description: ` Find the best developers based on your exact requirements—filter candidates by experience, skills, location, contract type, and more. Don’t wait for developers to come to you.`,
        image: 'assets/images/hiring/hiring-illustration-1.png',
      },
      {
        title: 'Filter out the noise',
        description: `We have over 300,000 developers on Frontend Mentor. We only show you the developers in our community who are actively looking for work.`,
        image: 'assets/images/hiring/hiring-illustration-2.png',
      },
      {
        title: 'Contact candidates directly',
        description: `Connecting with developers you’re interested in couldn’t be easier. Message your preferred candidates directly through the platform.`,
        image: 'assets/images/hiring/hiring-illustration-3.png',
      },
      {
        title: 'Key developer insights',
        description: `At-a-glance stats for each developer saves you time when searching. See critical insights, including projects, code reviews, and work experience.`,
        image: 'assets/images/hiring/hiring-illustration-4.png',
      },
    ];
  }
}
