import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { AboutPrivateSolutionsComponent } from '../about-private-solution.component';
import { MarkdownGuideComponent } from '../markdown-guide/markdown-guide.component';

@Component({
  selector: 'lbk-submit-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './submit-form.component.html',
})
export class SubmitFormComponent {
  constructor(private readonly _dialogService: DialogService) {}

  /**
   * - Show About Private Solution
   */
  showAboutPrivateSolution() {
    this._dialogService.open(AboutPrivateSolutionsComponent);
  }

  /**
   * - Show Markdown Guide
   */
  showMarkdownGuide() {
    this._dialogService.open(MarkdownGuideComponent);
  }
}
