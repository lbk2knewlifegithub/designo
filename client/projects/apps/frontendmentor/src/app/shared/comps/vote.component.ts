import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-vote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i class="fa-solid fa-angle-up text-secondary"></i>

    <span class="text-primary font-bold text-xs">
      <ng-content></ng-content>
    </span>
  `,

  styles: [
    `
      :host {
        @apply inline-flex items-center gap-3 rounded-full px-5 py-3 bg-primary/5;
      }

      :host-context(.vertical) {
        @apply flex-col py-3 px-4 gap-2;
      }
    `,
  ],
})
export class VoteComponent {}

@NgModule({
  exports: [VoteComponent],
  declarations: [VoteComponent],
})
export class VoteModule {}
