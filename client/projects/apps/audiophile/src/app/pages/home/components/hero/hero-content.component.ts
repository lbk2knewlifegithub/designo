import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-hero-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-center 2xl:text-left">
      <p class="text-sm text-gray-400 uppercase">New product</p>

      <h1
        class="text-white uppercase text-[36px] leading-[40px] translate-x-[1.29px] font-bold mt-4 md:text-5xl"
      >
        XX99 Mark II Headphones
      </h1>

      <h3 class="text-gray-300 font-medium mt-6">
        Experience natural, lifelike audio and exceptional build quality made
        for the passionate music enthusiast.
      </h3>

      <a
        routerLink="/product/xx99-mark-two-headphones"
        class="btn btn-primary mt-7 md:mt-10"
        >See product</a
      >
    </div>
  `,
})
export class HeroContentComponent {}
