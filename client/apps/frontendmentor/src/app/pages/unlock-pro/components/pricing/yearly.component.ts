import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-yearly',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div class="text-center">
        <h3 class="text-primary font-black tracking-widest">YEARLY</h3>

        <h4 class="mt-4">
          <strong class="text-3xl font-bold xl:text-4xl"> $8 </strong>
          <span class="font-mono font-normal">/month</span>
        </h4>

        <span class="block text-xs text-secondary min-h-[42px] xl:text-sm"
          >$96 billed yearly (save 33% vs monthly)</span
        >
      </div>

      <ul class="pt-8 border-t-2 space-y-2 xl:px-4 xl:space-y-4">
        <li>
          <lbk-feature [unlock]="true"> Access free challenges </lbk-feature>
        </li>
        <li>
          <lbk-feature [unlock]="true">Join Slack community</lbk-feature>
        </li>

        <li>
          <lbk-feature [unlock]="true">Access premium challenges</lbk-feature>
        </li>

        <li>
          <lbk-feature [unlock]="true"
            >Access Sketch and Figma design files</lbk-feature
          >
        </li>

        <li>
          <lbk-feature [unlock]="true">Make solutions private</lbk-feature>
        </li>

        <li>
          <lbk-feature [unlock]="true"
            >Unlimited solution screenshots</lbk-feature
          >
        </li>

        <li>
          <lbk-feature [unlock]="true">
            <span class="badge badge-primary rounded-none uppercase mr-2">
              Pro
            </span>
            label
          </lbk-feature>
        </li>
      </ul>
    </div>

    <!-- Unlock Pro -->
    <div class="flex flex-col justify-center px-6 md:px-0 lg:px-4">
      <button
        class="btn btn-error font-bold tracking-widest italic py-2 lg:py-3"
      >
        UNLOCK PRO
      </button>
      <span class="text-xs text-secondary text-center mt-2"
        >14-day money back guarantee</span
      >
    </div>
    <!-- end Unlock Pro -->
  `,
  styles: [
    `
      :host {
        @apply flex flex-col gap-8 bg-secondary-50 rounded-lg pt-14 pb-10 px-6 md:h-full md:justify-between xl:gap-6 xl:min-h-[693px];
      }
    `,
  ],
})
export class YearlyComponent {}
