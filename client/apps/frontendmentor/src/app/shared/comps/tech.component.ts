import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-tech',
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

      :host-context(.GENERAL) {
        @apply text-warning-50;
      }
    `,
  ],
})
export class TechComponent {}

@NgModule({
  exports: [TechComponent],
  declarations: [TechComponent],
})
export class TechModule {}
