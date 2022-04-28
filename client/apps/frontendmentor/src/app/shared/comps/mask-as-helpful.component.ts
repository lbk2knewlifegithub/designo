import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-mask-as-helpful',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      aria-label="Mask As Helpful"
      class="text-primary inline-flex gap-1 items-center"
    >
      <i class="fa-solid fa-thumbs-up"></i>
      <span class="font-bold text-xs"> MARKED AS HELPFUL </span>
    </button>
  `,
})
export class MaskAsHelpFullComponent {}

@NgModule({
  exports: [MaskAsHelpFullComponent],
  declarations: [MaskAsHelpFullComponent],
})
export class MaskAsHelpFullModule {}
