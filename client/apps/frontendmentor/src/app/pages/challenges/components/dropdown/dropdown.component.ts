import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownService } from './dropdown.service';

@Component({
  selector: 'lbk-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown.component.html',
  providers: [DropdownService],
  styles: [
    `
      button {
        @apply grow flex justify-center items-center gap-3;
        @apply text-xs italic font-bold py-4 border sm:border-y-0 sm:px-8;

        i {
          @apply duration-300;
        }
      }
    `,
  ],
})
export class DropdownComponent implements OnInit {
  shownFilterBy$!: Observable<boolean>;
  shownSortBy$!: Observable<boolean>;

  constructor(private readonly _dropdownService: DropdownService) {}

  ngOnInit(): void {
    this.shownFilterBy$ = this._dropdownService.shownFilterBy$;

    this.shownSortBy$ = this._dropdownService.shownSortBy$;
  }

  /**
   * - Toggle Sort By
   */
  toggleSortBy() {
    this._dropdownService.toggleSortBy();
  }

  /**
   * - Toggle Filter By
   */
  toggleFilterBy() {
    this._dropdownService.toggleFilterBy();
  }

  /**
   * - Close
   */
  close() {
    this._dropdownService.close();
  }
}
