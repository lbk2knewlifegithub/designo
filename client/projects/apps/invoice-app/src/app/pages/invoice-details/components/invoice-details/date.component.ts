import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-3">
      <span class="text-muted-900 dark:text-muted-800">{{ title | titlecase }}</span>
      <h4>{{ date | date: 'dd-MMM-yyyy' }}</h4>
    </div>
  `,
})
export class DateComponent {
  @Input() date!: string;
  @Input() title!: string;
}
