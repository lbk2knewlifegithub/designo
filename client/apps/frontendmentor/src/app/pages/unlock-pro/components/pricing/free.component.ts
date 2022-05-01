import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-free',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div class="text-center">
        <h3 class="text-primary font-black tracking-widest">FREE</h3>

        <h4 class="mt-4">
          <strong class="text-3xl font-bold xl:text-4xl"> $0 </strong>
          <span class="font-mono font-normal">/month</span>
        </h4>

        <div class="min-h-[42px]"></div>
      </div>

      <ul class="pt-8 border-t-2 space-y-2 xl:px-4 xl:space-y-4">
        <li>
          <lbk-feature [unlock]="true"> Access free challenges </lbk-feature>
        </li>
        <li>
          <lbk-feature [unlock]="true">Join Slack community</lbk-feature>
        </li>

        <li>
          <lbk-feature>Access premium challenges</lbk-feature>
        </li>

        <li>
          <lbk-feature>Access Sketch and Figma design files</lbk-feature>
        </li>

        <li>
          <lbk-feature>Make solutions private</lbk-feature>
        </li>

        <li>
          <lbk-feature>Unlimited solution screenshots</lbk-feature>
        </li>

        <li>
          <lbk-feature>
            <span class="badge badge-primary rounded-none uppercase mr-2">
              Pro
            </span>
            label
          </lbk-feature>
        </li>
      </ul>
    </div>

    <!-- Login With Github -->
    <div class="flex flex-col px-4 md:px-0 lg:px-4">
      <button
        class="text-center btn btn-icon btn-error-outline py-2 w-full xl:py-[6px] lg:py-3"
      >
        Login with Github
        <i class="fa-brands fa-github text-lg"></i>
      </button>
      <div class="min-h-[24px]"></div>
    </div>
    <!-- end Login With Github -->
  `,
  styles: [
    `
      :host {
        @apply flex flex-col gap-8 bg-secondary-50 rounded-lg pt-14 pb-10 px-6 md:h-full md:justify-between xl:h-full xl:gap-6 xl:min-h-[693px];
      }
    `,
  ],
})
export class FreeComponent {}
