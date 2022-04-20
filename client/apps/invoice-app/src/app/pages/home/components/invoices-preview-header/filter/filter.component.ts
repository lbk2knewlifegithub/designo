import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { InvoiceStatus } from '../../../../../shared';

@Component({
  selector: 'lbk-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
  @Input() status!: InvoiceStatus | null;
  @Output() statusChange = new EventEmitter<InvoiceStatus | null>();

  statues!: InvoiceStatus[];

  ngOnInit(): void {
    this.statues = Object.values(InvoiceStatus);
  }

  statusClick(newStatus: InvoiceStatus) {
    newStatus === this.status
      ? this.statusChange.emit(null)
      : this.statusChange.emit(newStatus);
  }

  get isFilterByPaid() {
    return this.status === InvoiceStatus.PAID;
  }

  get isFilterByPending() {
    return this.status === InvoiceStatus.PENDING;
  }

  get isFilterByDraft() {
    return this.status === InvoiceStatus.DRAFT;
  }
}
