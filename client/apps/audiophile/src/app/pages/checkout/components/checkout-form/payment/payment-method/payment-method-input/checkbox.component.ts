import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      aria-label="Ball"
      type="button"
      class=" grid place-content-center border border-gray-300 w-[20px] h-[20px] rounded-full "
    >
      <!-- ball -->
      <div
        [ngClass]="{ 'opacity-0': !checked }"
        class="duration-300 w-[10px] h-[10px] bg-primary-900 rounded-full"
      ></div>
      <!-- end ball -->
    </button>
  `,
})
export class CheckboxComponent {
  @Input() checked!: boolean;
}
