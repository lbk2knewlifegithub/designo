import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-premium-speaker-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative grid gap-8 place-items-center bg-primary-900 rounded-lg py-14 px-6 overflow-hidden md:gap-16 md:pt-14 md:pb-16 2xl:grid-cols-2 2xl:py-0 2xl:px-[117.5px] 2xl:pt-24 2xl:gap-[138px]"
    >
      <!-- hero image -->
      <lbk-premium-hero-image
        class="max-w-[172px] md:max-w-[200px] 2xl:max-w-none 2xl:relative 2xl:top-[10px]"
      ></lbk-premium-hero-image>
      <!-- end hero image -->

      <!-- content -->
      <div class="text-center max-w-xs z-50 2xl:text-left">
        <h2 class="text-3xl uppercase text-white font-bold md:text-5xl">
          ZX9 <br />
          speaker
        </h2>

        <p class="text-muted-900 font-medium mt-6">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>

        <!-- See Product Button -->
        <a class="btn btn-dark mt-6 md:mt-10" routerLink="/product/zx9-speaker"
          >See product</a
        >
        <!-- end See Product Button -->
      </div>
      <!-- end content -->
    </div>
  `,
})
export class PremiumSpeakerPreviewComponent {}
