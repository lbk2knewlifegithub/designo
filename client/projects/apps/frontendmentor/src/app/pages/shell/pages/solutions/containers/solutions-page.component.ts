import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-solutions-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./solutions-page.component.html`,
  styles: [
    `
      a.active {
        @apply border-b-2 border-primary md:border-b-4;
      }
    `,
  ],
})
export class SolutionsPageComponent {}
