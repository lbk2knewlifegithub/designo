import { Solution } from '@lbk/fm/shared';
import { UserMinimal } from '@lbk/models';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-solution-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solution-preview.component.html',
  styleUrls: ['./solution-preview.component.scss'],
})
export class SolutionPreviewComponent {
  @Input() shownQuestions?: boolean;

  @Input() solution!: Solution;

  get user(): UserMinimal {
    return this.solution.user;
  }
}
