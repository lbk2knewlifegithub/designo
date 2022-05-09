import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { MarkdownGuideComponent } from './markdown-guide/markdown-guide.component';

@Component({
  selector: 'lbk-add-comment-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Open markdown guide -->
    <button
      type="button"
      (click)="showMarkdownGuide()"
      class="absolute top-0 right-0 -translate-y-[70%]"
      aria-label="Open markdown syntax helper guide"
    >
      <i class="fa-solid fa-keyboard text-lg"></i>
    </button>
    <!-- end Open markdown guide -->

    <textarea class="w-full p-4 mt-2" rows="10"></textarea>

    <div class="mt-2 flex justify-end">
      <button class="btn btn-error font-bold italic tracking-widest px-10">
        POST FEEDBACK
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        @apply block relative;
      }
    `,
  ],
})
export class AddCommmentInputComponent {
  constructor(private readonly _dialogService: DialogService) {}

  /**
   * - Show Markdown Guide
   */
  showMarkdownGuide() {
    this._dialogService.open(MarkdownGuideComponent);
  }
}

@NgModule({
  exports: [AddCommmentInputComponent],
  declarations: [AddCommmentInputComponent],
})
export class AddCommentInputComponentModule {}
