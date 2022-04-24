import { Component } from '@angular/core';

@Component({
  selector: 'lbk-explore',
  template: `
    <h2 class="text-xs font-bold">EXPLORE</h2>

    <ul class="mt-4 text-sm grid gap-2">
      <li>
        <a routerLink="/challenges">Challenges</a>
      </li>

      <li>
        <a routerLink="/solutions">Solutions</a>
      </li>

      <li>
        <a routerLink="/resources">Resources</a>
      </li>

      <li>
        <a routerLink="/unlock-prod">Unlock PRO</a>
      </li>

      <li>
        <a routerLink="/hiring">Hire Developer</a>
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
export class ExploreComponent {}
