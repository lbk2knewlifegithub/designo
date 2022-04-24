import { Component } from '@angular/core';

@Component({
  selector: 'lbk-community',
  template: `
    <h2 class="text-xs font-bold">COMMUNITY</h2>

    <ul class="mt-4 text-sm grid gap-2">
      <li>
        <a routerLink="/contact">Contact Us</a>
      </li>

      <li>
        <a routerLink="/solutions">Slack</a>
      </li>

      <li>
        <a routerLink="/faq">FAQs</a>
      </li>

      <li>
        <a routerLink="/unlock-prod">Guidelines</a>
      </li>

      <li>
        <a routerLink="/hire-developer">Blog</a>
      </li>
    </ul>
  `,
  styles: [
    `
      a {
        @apply inline-block border-b-[3px] border-red-500;
      }
    `,
  ],
})
export class CommunityComponent {}
