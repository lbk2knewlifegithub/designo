import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <li>
        <a
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="active"
          routerLink="/shell/wall-of-fame"
          >This Week</a
        >
      </li>

      <li>
        <a
          routerLinkActive="active"
          [queryParams]="{ tab: 'month' }"
          routerLink="/shell/wall-of-fame"
          >This Month</a
        >
      </li>
      <li>
        <a
          routerLinkActive="active"
          [queryParams]="{ tab: 'year' }"
          routerLink="/shell/wall-of-fame"
          >This Year</a
        >
      </li>

      <li>
        <a
          routerLinkActive="active"
          [queryParams]="{ tab: 'all-time' }"
          routerLink="/shell/wall-of-fame"
          >All-Time</a
        >
      </li>
    </ul>
  `,
  styles: [
    `
      ul {
        @apply flex gap-3 justify-between border-b-2 sm:min-w-[400px];
        li {
          @apply grow;
          a {
            @apply block text-center text-xs font-medium text-secondary;
            &.active {
              @apply pb-1 border-b-2 border-primary sm:w-full;
            }
          }
        }
      }
    `,
  ],
})
export class TabsComponent {}
