import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="font-bold text-lg tracking-widest">REPORTS</h1>

    <ul>
      <li>
        <a [routerLink]="['/report']" [queryParams]="{ tag: 'accessibility' }"
          >Accessibility</a
        >

        <a [routerLink]="['/report']" [queryParams]="{ tag: 'html-validation' }"
          >HTML Validations</a
        >
      </li>
    </ul>
  `,
})
export class LinksComponent {}
