import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-links-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="flex flex-col gap-8 text-xs md:flex-row">
      <li>
        <a routerLink="/about" routerLinkActive="underline"> OUR COMPANY </a>
      </li>
      <li>
        <a routerLink="/locations" routerLinkActive="underline">LOCATIONS</a>
      </li>
      <li>
        <a routerLink="/contact" routerLinkActive="underline">CONTACT</a>
      </li>
    </ul>
  `,
  styles: [
    `
      ul {
        li {
          a {
            @apply hover:underline;
          }
        }
      }
    `,
  ],
})
export class LinksFooterComponent {}
