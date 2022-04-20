import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-invoices-preview-page-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="fixed inset-0 grid w-full h-full bg-white/90 place-content-center duration-300 z-50"
    >
      <lbk-spinner [loading]="true"></lbk-spinner>
    </div>
  `,
})
export class InvoicesPreviewPageLoadingComponent {}
