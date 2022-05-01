import { Component } from '@angular/core';

@Component({
  selector: 'lbk-links',
  template: `
    <!-- Profile -->
    <a routerLinkActive="active" routerLink="/settings">Profile</a>
    <!-- end Profile -->

    <!-- Account -->
    <a routerLinkActive="active" routerLink="/settings/account">Account</a>
    <!-- end Account -->

    <!-- Billing -->
    <a routerLinkActive="active" routerLink="/settings/billing">Billing</a>
    <!-- end Billing -->

    <!-- Notification -->
    <a routerLinkActive="active" routerLink="/settings/notifications"
      >Notifications</a
    >
    <!-- end Notification -->
  `,
  styles: [
    `
      :host {
        @apply flex items-center text-xs gap-3 md:gap-6 sm:text-base;

        a {
          @apply duration-300 border-b-2 border-transparent md:px-2;
        }

        a.active {
          @apply font-medium border-b-2 border-error;
        }
      }
    `,
  ],
})
export class LinksComponent {}
