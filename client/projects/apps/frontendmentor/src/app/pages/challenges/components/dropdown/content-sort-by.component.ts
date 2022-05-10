import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownService } from './dropdown.service';

@Component({
  selector: 'lbk-content-sort-by',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul (clickOutside)="close()" [skip]="['#sort-by']" class="grid bg-white">
      <li>
        <a
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLink="/challenges"
          class="fancy-border"
        >
          Most Recent
        </a>
      </li>

      <li>
        <a
          routerLinkActive="active"
          routerLink="/challenges"
          queryParamsHandling="merge"
          [queryParams]="{ sort: 'difficulty|asc' }"
          class="fancy-border"
          >Difficulty (Easier First)</a
        >
      </li>
      <li>
        <a
          routerLinkActive="active"
          routerLink="/challenges"
          [queryParams]="{ sort: 'difficulty|desc' }"
          queryParamsHandling="merge"
          class="fancy-border"
          >Difficulty (Harder First)</a
        >
      </li>
    </ul>
  `,
  styles: [
    `
      ul {
        @apply z-20 border;
        li {
          a {
            @apply block py-4 pl-6 font-medium text-xs border-t;
            &.active {
              @apply border-l-primary border-l-4;
            }
          }
        }
      }
    `,
  ],
})
export class ContentSortByComponent {
  mostRecent$!: Observable<boolean>;
  constructor(private readonly _dropdownService: DropdownService) {}

  close() {
    this._dropdownService.close();
  }
}
