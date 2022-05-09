import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-mask-as-paid-snack-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p class="text-lg inline-block">
    Mask as paid successful <span class="ml-4"> 🙂 🙂🙂🙂🙂🙂</span>
  </p>`,
})
export class MaskAsPaidSnackBarComponent {}
