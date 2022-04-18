import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container mt-20">
      <lbk-project-preview-list></lbk-project-preview-list>
    </main>
  `,
})
export class HomePageComponent {}
