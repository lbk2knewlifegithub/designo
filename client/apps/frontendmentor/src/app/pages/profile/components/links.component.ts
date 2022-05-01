import { Component } from '@angular/core';

@Component({
  selector: 'lbk-links',
  template: `
    <!-- Overview -->
    <a
      routerLinkActive="active"
      [routerLinkActiveOptions]="{ exact: true }"
      routerLink="/profile"
      >Overview</a
    >
    <!-- end Overview -->

    <!-- Solutions -->
    <a class="gap-1" routerLinkActive="active" routerLink="/profile/solutions">
      Solutions
      <span class="badge badge-primary text-xs rounded-lg py-[1px] px-[2px]"
        >57</span
      >
    </a>
    <!-- end Solutions -->

    <!-- Comments -->
    <a class="gap-1" routerLinkActive="active" routerLink="/profile/comments"
      >Comments
      <span class="badge badge-primary text-xs rounded-lg py-[1px] px-[2px]"
        >1</span
      >
    </a>
    <!-- end Comments -->
  `,
  styles: [
    `
      :host {
        @apply flex items-center justify-between text-xs gap-3 md:gap-6 sm:text-base;

        a {
          @apply inline-flex items-center duration-300 border-b-2 border-transparent md:px-2;
        }

        a.active {
          @apply font-medium border-b-2 border-error;
        }
      }
    `,
  ],
})
export class LinksComponent {}
