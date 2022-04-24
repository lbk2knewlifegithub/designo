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
    <section class="container">
      <ul class="grid gap-36">
        <li *ngFor="let hiring of hiringList; index as i">
          <!-- Hiring Illustration -->
          <img [src]="hiring.image" [alt]="hiring.title" />
          <!-- end Hiring Illustration -->

          <div class="relative text-center mt-16">
            <!-- Index -->
            <span
              class="absolute z-[-1] opacity-40 font-bold font-heading text-[7.5rem] text-secondary top-0 left-1/2 -translate-y-1/2  -translate-x-1/2"
              >{{ i + 1 }}</span
            >
            <!-- end Index -->

            <!-- Hiring Title -->
            <h2 class="text-3xl font-medium">{{ hiring.title }}</h2>
            <!-- end Hiring Title -->

            <!-- Description -->
            <p class="mt-4 text-secondary">{{ hiring.description }}</p>
            <!-- end Description -->
          </div>
        </li>
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
