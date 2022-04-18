import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-about-us',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="overflow-hidden bg-peach-200 md:container md:bg-transparent 2xl:max-h-[480px]"
    >
      <div
        class="md:relative md:bg-peach-200 md:rounded-lg md:overflow-hidden 2xl:flex 2xl:justify-between 2xl:items-center"
      >
        <!-- About Image Hero -->
        <lbk-image
          classImage="w-full"
          class="object-center object-cover max-h-[320px] 2xl:max-h-[480px] 2xl:w-auto 2xl:order-last"
          [image]="image"
        ></lbk-image>
        <!-- end About Image Hero -->

        <div
          class="container text-white py-[80px] text-center max-w-[530px] 2xl:px-0 2xl:ml-[95px] 2xl:text-left 2xl:max-w-[458px]"
        >
          <h1 class="font-medium text-lg md:text-xl">About Us</h1>
          <p class="text-sm mt-6 md:text-base md:mt-8">
            Founded in 2010, we are a creative agency that produces lasting
            results for our clients. We’ve partnered with many startups,
            corporations, and nonprofits alike to craft designs that make real
            impact. We’re always looking forward to creating brands, products,
            and digital experiences that connect with our clients' audiences.
          </p>
        </div>

        <!-- Pattern Circle -->
        <img
          class="absolute bottom-0 right-0 z-10 min-w-[140%] -translate-y-1/2 sm:min-w-[180%] sm:bottom-[-40%] 2xl:min-w-[640px] 2xl:right-[60%] 2xl:scale-[160%] 2xl:bottom-0"
          src="assets/about/mobile/bg-pattern-hero-about-mobile.svg"
          alt="Pattern Circle"
        />
        <!-- end Pattern Circle -->
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
