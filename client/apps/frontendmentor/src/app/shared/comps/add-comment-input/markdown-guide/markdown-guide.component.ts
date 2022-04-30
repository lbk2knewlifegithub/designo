import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-markdown-guide',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './markdown-guide.component.html',
  styles: [
    `
      :host {
        @apply p-12;
      }
    `,
  ],
})
export class MarkdownGuideComponent {}
