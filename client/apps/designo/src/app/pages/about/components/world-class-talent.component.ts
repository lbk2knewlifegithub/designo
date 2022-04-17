import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-world-class-talent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="md:container bg-peach-200/5 md:bg-transparent 2xl:max-[640px]"
    >
      <div
        class="md:relative md:bg-peach-200/5 md:rounded-lg md:overflow-hidden 2xl:flex 2xl:gap-[94px] 2xl:items-center"
      >
        <!-- World Class Talent Image -->
        <lbk-image
          classImage="w-full"
          class="w-full object-center object-cover max-h-[320px] 2xl:w-auto 2xl:max-h-[640px]"
          [image]="image"
        ></lbk-image>
        <!-- end World Class Talent Image -->

        <div
          class="relative py-[80px] text-center max-w-[530px] mx-auto md:py-16 2xl:text-left 2xl:max-w-[445px] 2xl:mx-0"
        >
          <h1 class="font-medium text-lg text-peach-200 md:text-xl">
            World-class talent
          </h1>

          <div class="text-sm space-y-6 text mt-6 md:text-base">
            <p>
              We are a crew of strategists, problem-solvers, and technologists.
              Every design is thoughtfully crafted from concept to launch,
              ensuring success in its given market. We are constantly updating
              our skills in a myriad of platforms.
            </p>
            <p>
              Our team is multi-disciplinary and we are not merely interested in
              form — content and meaning are just as important. We give great
              importance to craftsmanship, service, and prompt delivery. Clients
              have always been impressed with our high-quality outcomes that
              encapsulates their brand’s story and mission.
            </p>
          </div>

          <!-- Circle -->
          <img
            class="absolute top-0 left-0"
            src="assets/about/mobile/bg-pattern-world-class-talent-mobile.svg"
            alt="Pattern Circle"
          />
          <!-- end Circle -->
        </div>
      </div>
    </section>
  `,
})
export class WorldClassTalentComponent implements OnInit {
  image!: Image;

  ngOnInit(): void {
    this.image = {
      mobile: 'assets/about/mobile/image-world-class-talent.jpg',
      tablet: 'assets/about/tablet/image-world-class-talent.jpg',
      desktop: 'assets/about/desktop/image-world-class-talent.jpg',
      alt: 'World Class Talent',
    };
  }
}
