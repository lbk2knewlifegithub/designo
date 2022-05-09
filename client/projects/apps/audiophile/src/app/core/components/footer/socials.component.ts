import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-socials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="inline-flex gap-4 text-xl text-white leading-6">
      <li>
        <a routerLink="/"><span class="link fab fa-facebook-square"></span></a>
      </li>
      <li>
        <a routerLink="/"><span class="link fab fa-twitter"></span></a>
      </li>
      <li>
        <a routerLink="/"><span class="link fab fa-instagram"></span></a>
      </li>
    </ul>
  `,
})
export class SocialsComponent {}
