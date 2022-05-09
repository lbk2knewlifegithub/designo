import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface PremiumChallenge {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'lbk-premium-challenges',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll">
      <div
        class="text-sm text-center px-4 max-w-[475px] mx-auto lg:max-w-[650px] lg:text-base"
      >
        <h3 class="font-black text-center tracking-[0.17rem]">
          INSIDE OUR PREMIUM CHALLENGES
        </h3>

        <p class="leading-6 mt-6 lg:leading-7">
          All PRO members have access to our premium challenges. These are our
          highest quality projects that provide the most realistic development
          experience possible. They also make incredible portfolio pieces!
        </p>
      </div>

      <ul class="grid gap-32 mt-24 md:gap-24 lg:gap-16">
        <ng-container *ngFor="let premium of premiumChallengeList; index as i">
          <li
            class="relative grid place-items-center gap-24 md:grid-cols-2 md:gap-4"
          >
            <ng-container *ngIf="i === 1">
              <!-- Pattern Zig Zag Pink -->
              <img
                class="absolute top-0 left-0 z-20 -translate-x-full"
                src="assets/images/shared/pattern-zig-zag-pink.svg"
                alt="Pattern Zig Zag Pink"
              />
              <!-- end Pattern Zig Zag Pink -->

              <!-- Pattern Three Curly Brackets -->
              <img
                class="absolute bottom-0 right-0 z-20 translate-x-full"
                src="assets/images/shared/pattern-three-curly-brackets.svg"
                alt="Pattern Three Curly Brackets"
              />
              <!-- end Pattern Three Curly Brackets -->
            </ng-container>

            <ng-container *ngIf="i === 2">
              <!-- Pattern Dots -->
              <img
                class="absolute bottom-0 right-0 z-20 translate-x-[200%]"
                src="assets/images/shared/pattern-dots.svg"
                alt="Patterns Dots"
              />
              <!-- end Pattern Dots -->
            </ng-container>

            <ng-container *ngIf="i === 3">
              <!-- Pattern Double Forward Slash -->
              <img
                class="absolute top-0 left-0 z-20 -translate-x-full -translate-y-full"
                src="assets/images/shared/pattern-double-forward-slash.svg"
                alt="Patterns Double Forward Slash"
              />
              <!-- end Pattern Double Forward Slash -->

              <!-- Pattern Square Bracket -->
              <img
                class="absolute bottom-0 right-0 z-20 -translate-y-full"
                src="assets/images/shared/pattern-square-bracket.svg"
                alt="Patterns Square Bracket"
              />
              <!-- end Pattern Square Bracket -->
            </ng-container>

            <!-- Illustration -->
            <div
              [ngClass]="{ 'md:order-last': i % 2 === 0 }"
              class="max-w-[396px] md:max-w-[560px]"
            >
              <img [src]="premium.image" [alt]="premium.title" />
            </div>
            <!-- Illustration -->

            <div
              class="max-w-[475px] px-6 relative text-center md:min-w-[350px] md:text-left md:!w-full"
            >
              <!-- Index -->
              <span
                class="absolute z-[-1] opacity-40 font-bold font-heading text-[7.5rem] text-secondary top-0 left-1/2 -translate-y-1/2  -translate-x-1/2 md:left-[30%] lg:left-[20%]"
                >{{ i + 1 }}</span
              >
              <!-- end Index -->

              <!-- Title -->
              <h2 class="text-2xl font-medium lg:text-xl">
                {{ premium.title }}
              </h2>
              <!-- end Title -->

              <!-- Description -->
              <p class="text-dark-/80 mt-4 text-sm md:text-base md:mt-6">
                {{ premium.description }}
              </p>
              <!-- end Description -->
            </div>
          </li>
        </ng-container>
      </ul>
    </section>
  `,
})
export class PremiumChallengesComponent implements OnInit {
  premiumChallengeList!: PremiumChallenge[];

  ngOnInit(): void {
    this._premiumChallengeList();
  }

  private _premiumChallengeList() {
    this.premiumChallengeList = [
      {
        title: 'Professional designs for multi-page websites',
        description: `Build fully-functional, multi-page websites and learn how to write scalable, maintainable code. By the end of each challenge, you'll have a beautiful new addition to your web development portfolio.`,
        image: 'assets/images/unlock-pro/image-multi-page.png',
      },

      {
        title: 'Sketch and Figma designs included',
        description: `Use the original design files and work like a professional developer. See exactly what styles need to be applied to get your solution close to the design.`,
        image: 'assets/images/unlock-pro/image-original-design.png',
      },

      {
        title: 'Mobile, tablet, and desktop layout designs',
        description: `Practice building fully-responsive websites by working to mobile, tablet, and desktop designs. No need to guess how your project should look at different breakpoints.`,
        image: 'assets/images/unlock-pro/image-multiple-devices.png',
      },

      {
        title: 'Professional design system',
        description: `Our premium challenges come with a simple, professional design system to help you plan out your styles. See common styles and patterns all in one neatly presented document.`,
        image: 'assets/images/unlock-pro/image-design-system.png',
      },
    ];
  }
}
