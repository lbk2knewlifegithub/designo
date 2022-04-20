import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-checkbox',
  template: `
    <div class="flex items-center group">
      <input type="checkbox" [checked]="checked" />

      <label class="inline-block cursor-pointer">
        {{ label | titlecase }}
      </label>
    </div>
  `,
  styles: [
    `
      input {
        @apply h-4 w-4 rounded-sm;
        @apply border text-sky-500 border-stone-900 mr-2 cursor-pointer;
        @apply checked:text-sky-600 checked:bg-stone-900 focus:ring-0;
      }
    `,
  ],
})
export class CheckboxComponent {
  @Input() label!: string;
  @Input() checked!: boolean;
}

@NgModule({
  imports: [CommonModule],
  exports: [CheckboxComponent],
  declarations: [CheckboxComponent],
})
export class CheckboxModule {}
