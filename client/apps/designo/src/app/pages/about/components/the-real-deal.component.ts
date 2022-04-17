import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-the-real-deal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section scrollTo class="bg-peach-200/5 container md:bg-transparent">
      <div
        class="md:relative md:bg-peach-200/5 md:rounded-lg md:overflow-hidden"
      >
        <!-- The Real Deal Image -->
        <lbk-image [image]="image"></lbk-image>
        <!-- end The Real Deal Image -->

        <div
          class="relative py-[80px] text-center max-w-[530px] mx-auto md:py-16"
        >
          <h1 class="font-medium text-lg text-peach-200 md:text-xl">
            The real deal
          </h1>

          <div class="text-sm space-y-6 text mt-6 md:text-base">
            <p>
              As strategic partners in our clients’ businesses, we are ready to
              take on any challenge as our own. Solving real problems require
              empathy and collaboration, and we strive to bring a fresh
              perspective to every opportunity. We make design and technology
              more accessible and give you tools to measure success.
            </p>
            <p>
              We are visual storytellers in appealing and captivating ways. By
              combining business and marketing strategies, we inspire audiences
              to take action and drive real results.
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
export class TheRealDealComponent implements OnInit {
  image!: Image;

  ngOnInit(): void {
    this.image = {
      mobile: 'assets/about/mobile/image-real-deal.jpg',
      tablet: 'assets/about/tablet/image-real-deal.jpg',
      desktop: 'assets/about/desktop/image-real-deal.jpg',
      alt: 'World Class Talent',
    };
  }
}
