import { Issue } from '@lbk/fm/shared';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-issues',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
})
export class IssuesComponent {
  @Input() issues!: Issue[];
}
