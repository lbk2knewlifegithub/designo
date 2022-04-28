import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-language',
  changeDetection: ChangeDetectionStrategy.Default,
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host {
        @apply font-bold uppercase text-sm lg:text-base;
      }

      :host-context(.html) {
        @apply text-accent;
      }

      :host-context(.js) {
        @apply text-purple;
      }

      :host-context(.css) {
        @apply text-primary;
      }

      :host-context(.api) {
        @apply text-success;
      }

      :host-context(.general) {
        @apply text-warning-50;
      }
    `,
  ],
})
export class LanguageComponent {}

@NgModule({
  exports: [LanguageComponent],
  declarations: [LanguageComponent],
})
export class LanguageModule {}
