import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'lbk-quantity',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./quantity.component.scss'],
  templateUrl: './quantity.component.html',
})
export class QuantityComponent {
  @Input() max = 1000;
  @Input() min = 0;

  @Input() quantity = 0;
  @Output() quantityChange = new EventEmitter<number>();

  @Output() plus = new EventEmitter<void>();
  @Output() minus = new EventEmitter<void>();

  @Input() small = false;

  add(value: number) {
    // emit plus or minus event
    if (value > 0) this.plus.emit();
    else this.minus.emit();

    const newQuantity = Math.min(
      Math.max(this.quantity + value, this.min),
      this.max
    );
    this.quantityChange.emit(newQuantity);
  }

  get buttonStyle() {
    return {
      'width.px': this.small ? 32 : 40,
      'height.px': this.small ? 32 : 48,
    };
  }

  get iconStyle() {
    return {
      'fontSize.px': this.small ? 8 : 13,
    };
  }
}
