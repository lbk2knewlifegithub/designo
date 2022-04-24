import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-tech-stack',
  changeDetection: ChangeDetectionStrategy.Default,
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host {
        @apply font-bold text-sm lg:text-base;
      }

      :host-context(.HTML) {
        @apply text-accent;
      }

      :host-context(.JS) {
        @apply text-purple;
      }

      :host-context(.CSS) {
        @apply text-primary;
      }

      :host-context(.API) {
        @apply text-success;
      }
    `,
  ],
})
export class TechStackComponent {}
