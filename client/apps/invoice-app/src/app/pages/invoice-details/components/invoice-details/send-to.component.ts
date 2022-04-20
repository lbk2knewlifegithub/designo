import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-send-to',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-3">
      <span class="text-muted-900 dark:text-muted-800">Send to</span>
      <h4>{{ email }}</h4>
    </div>
  `,
})
export class SendToComponent {
  @Input() email!: string;
}
