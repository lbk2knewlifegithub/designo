import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-assets-provided',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-sm font-bold lg:text-base">ASSETS PROVIDED</h2>

    <ul>
      <li>
        <img src="assets/images/shared/icon-cross.svg" alt="Check" />

        <span>
          Sketch and Figma design file access -
          <a class="underline" routerLink="/unlock-pro"> Unlock with PRO </a>
        </span>
      </li>

      <li>
        <img src="assets/images/shared/icon-check.svg" alt="Check" />
        JPEG design files for mobile & desktop layouts
      </li>

      <li>
        <img src="assets/images/shared/icon-check.svg" alt="Check" />
        Style guide for fonts, colors, etc
      </li>

      <li>
        <img src="assets/images/shared/icon-check.svg" alt="Check" />
        Optimized image assets
      </li>

      <li>
        <img src="assets/images/shared/icon-check.svg" alt="Check" />
        README file to help you get started
      </li>

      <li>
        <img src="assets/images/shared/icon-check.svg" alt="Check" />
        HTML file with pre-written content
      </li>
    </ul>
  `,
  styles: [
    `
      :host {
        @apply bg-secondary-50 p-6 rounded-xl lg:p-8;

        ul {
          @apply grid mt-4 gap-2 sm:mt-6;
          li {
            @apply text-xs inline-flex items-start gap-4 lg:text-base;

            img {
              @apply w-[13px] aspect-square;
            }
          }
        }
      }
    `,
  ],
})
export class AssetsProvidedComponent {}
