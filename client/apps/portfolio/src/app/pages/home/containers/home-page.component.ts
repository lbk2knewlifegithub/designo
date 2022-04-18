import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container mt-20">
      <h2 class="text-3xl text-center">Portfolio (Coming Soon)</h2>

      <!-- <lbk-skills></lbk-skills> -->

      <lbk-project-preview-list class="block mt-8"></lbk-project-preview-list>
    </main>
  `,
})
export class HomePageComponent {}
