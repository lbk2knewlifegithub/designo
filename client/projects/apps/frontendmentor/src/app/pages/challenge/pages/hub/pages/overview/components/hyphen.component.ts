import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'lbk-hyphen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span *ngIf="!!value; else hyphen">
      {{ value }}
    </span>

    <ng-template #hyphen>
      <div class="w-3 h-1 bg-black"></div>
    </ng-template>
  `,
})
export class HyphenComponent {
  @Input() value?: number;
}
