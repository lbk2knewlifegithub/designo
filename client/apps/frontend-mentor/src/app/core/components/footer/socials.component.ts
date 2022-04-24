import { Component } from '@angular/core';

@Component({
  selector: 'lbk-socials',
  template: `
    <ul>
      <!-- Twitter -->
      <li>
        <a aria-label="Twitter" href="/">
          <img src="assets/images/twitter.svg" alt="Twitter" />
        </a>
      </li>
      <!-- end Twitter -->

      <!-- LinkedIn -->
      <li>
        <a aria-label="LinkedIn" href="/">
          <img src="assets/images/linkedin.svg" alt="LinkedIn" />
        </a>
      </li>
      <!-- end Linked -->

      <!-- Facebook -->
      <li>
        <a aria-label="Facebook" href="/">
          <img src="assets/images/facebook.svg" alt="Facebook" />
        </a>
      </li>
      <!-- end Facebook -->
    </ul>
  `,
  styles: [
    `
      ul {
        @apply flex gap-2 md:gap-4;
        li {
          a {
            @apply inline-block h-12 w-12 rounded-full;
            @apply grid place-content-center border-2 border-primary;
            img {
              @apply w-5 h-5;
            }
          }
        }
      }
    `,
  ],
})
export class SocialsComponent {}
