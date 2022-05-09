import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-shell-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-sub-header title="Solutions">
      <ul class="flex gap-3 text-sm font-medium items-center sm:gap-4 md:gap-6">
        <li>
          <a routerLinkActive="active" routerLink="/shell/solutions"
            >Solutions</a
          >
        </li>

        <li>
          <a routerLinkActive="active" routerLink="/shell/activity">Activity</a>
        </li>

        <li>
          <a routerLinkActive="active" routerLink="/shell/wall-of-fame"
            >Wall of Fame</a
          >
        </li>
      </ul>
    </lbk-sub-header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      a.active {
        @apply border-b-2 border-error;
      }
    `,
  ],
})
export class ShellPageComponent {}
