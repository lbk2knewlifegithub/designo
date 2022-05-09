import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceStatus } from '../../shared';
import { NgModule } from '@angular/core';

@Component({
  selector: 'lbk-invoice-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [ngClass]="ngClass"
      class="flex justify-center items-center gap-2  w-[104px] py-3 rounded-md"
    >
      <!-- ball  -->
      <span [ngClass]="ballClass" class="w-2 h-2 rounded-full"></span>
      <!-- end ball  -->

      <span class="font-bold">{{ status | titlecase }}</span>
    </button>
  `,
})
export class InvoiceStatusComponent {
  @Input() status!: InvoiceStatus;

  get ngClass() {
    return {
      [InvoiceStatus.PENDING]:
        'text-warning-900 bg-warning-900 bg-opacity-[11%]',
      [InvoiceStatus.PAID]: 'text-success-900 bg-success-900 bg-opacity-[11%]',
      [InvoiceStatus.DRAFT]: 'bg-fill dark:bg-black/15',
    }[this.status];
  }

  get ballClass() {
    return {
      [InvoiceStatus.PENDING]: 'bg-warning-900',
      [InvoiceStatus.PAID]: 'bg-success-900',
      [InvoiceStatus.DRAFT]: 'bg-black dark:bg-muted-900',
    }[this.status];
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [InvoiceStatusComponent],
  declarations: [InvoiceStatusComponent],
})
export class InvoiceStatusModule {}
