import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Language } from '../../models';

@Component({
  selector: 'lbk-language-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="flex gap-2">
      <li *ngFor="let language of languages">
        <lbk-language [classList]="language">{{ language }}</lbk-language>
      </li>
    </ul>
  `,
})
export class LanguageListComponent {
  @Input() languages!: Language[];
}
