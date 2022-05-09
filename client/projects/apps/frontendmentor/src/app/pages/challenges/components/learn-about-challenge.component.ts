import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-learn-about-challenge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="font-medium text-2xl">
      What are the different challenge types?
    </h2>

    <div class="mt-4">
      <span class="badge rounded-full bg-primary/10 badge-primary-outline">
        FREE
      </span>
    </div>

    <div class="text-sm mt-4 text-dark/80 leading-6">
      <p>
        Free challenges can be started by anyone. All the starter code including
        the assets and designs in JPG format are free to download.
      </p>

      <p class="mt-2">
        There are Sketch and Figma design files for these challenges but they
        need to be purchased with design credits. Design credits are available
        with a
        <a
          routerLink="/unlock-pro"
          class="mx-2 badge badge-xs rounded-none badge-primary"
          >PRO</a
        >
        subscription.
      </p>
    </div>

    <hr class="my-4" />

    <span class="badge badge-warning"> FREE+ </span>

    <div class="mt-2 text-sm text-dark/80 leading-6">
      <p>
        Free+ challenges can be started by anyone. All the starter code
        including the assets are free to download.
      </p>
      <p class="mt-2">
        The Sketch and Figma design files are freely available to download for
        all users. These challenges allow anyone to trial premium challenges
        without subscribing as a
        <a
          routerLink="/unlock-pro"
          class="badge badge-xs rounded-none badge-primary"
          >PRO</a
        >
        member.
      </p>
    </div>

    <hr class="my-4" />

    <span class="badge badge-primary"> PREMIUM </span>

    <p class="mt-2 text-dark/80 text-sm leading-6">
      Premium challenges can only be started by
      <a
        class="badge badge-xs rounded-none badge-primary"
        routerLink="/unlock-pro"
        >PRO</a
      >
      members. The Sketch and Figma design files are included.
    </p>
  `,
  styles: [
    `
      :host {
        @apply p-6;
      }
    `,
  ],
})
export class LearnAboutChallengeComponent {}
