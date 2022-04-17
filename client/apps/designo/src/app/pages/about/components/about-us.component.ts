import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-about-us',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container bg-peach-200 md:bg-transparent">
      <div class="md:relative md:bg-peach-200 md:rounded-lg md:overflow-hidden">
        <!-- About Image Hero -->
        <lbk-image [image]="image"></lbk-image>
        <!-- end About Image Hero -->

        <div
          class="relative overflow-hidden text-white  py-[80px] text-center max-w-[530px] mx-auto"
        >
          <h1 class="font-medium text-lg md:text-xl">About Us</h1>
          <p class="text-sm mt-6 md:text-base md:mt-8">
            Founded in 2010, we are a creative agency that produces lasting
            results for our clients. We’ve partnered with many startups,
            corporations, and nonprofits alike to craft designs that make real
            impact. We’re always looking forward to creating brands, products,
            and digital experiences that connect with our clients' audiences.
          </p>

          <!-- Two Circle -->
          <img
            class="absolute top-0 right-0 z-10 min-w-[584px] -translate-y-1/2 md:hidden"
            src="assets/about/mobile/bg-pattern-hero-about-mobile.svg"
            alt="Pattern Circle"
          />
          <!-- end Two Circle -->
        </div>

        <!-- One Circle -->
        <img
          class="hidden absolute top-[-15%] -rotate-45 -left-[15%] min-w-[640px] md:block"
          src="assets/shared/desktop/bg-pattern-small-circle.svg"
          alt="Pattern Circle"
        />
        <!-- end One Circle -->
      </div>
    </section>
  `,
})
export class AboutUsComponent implements OnInit {
  image!: Image;

  ngOnInit(): void {
    this.image = {
      mobile: 'assets/about/mobile/image-about-hero.jpg',
      tablet: 'assets/about/tablet/image-about-hero.jpg',
      desktop: 'assets/about/desktop/image-about-hero.jpg',
      alt: 'About Us',
    };
  }
}
