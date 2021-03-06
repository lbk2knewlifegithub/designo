import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-author',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <p class="text-center text-xs">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
          >Frontend Mentor</a
        >. Coded by
        <a
          class="text-sky-600 decoration-wavy"
          href="https://github.com/lbk2knewlifegithub"
          >lbk2</a
        >.
      </p>
    </footer>
  `,
})
export class AuthorComponent {}
