import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SortFeedback } from './../state/home.reducer';

@Component({
  selector: 'lbk-sort-by',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-dropdown [closeWhenContentClick]="true" #dropdown>
      <!-- Toggle -->
      <button
        dropDownToggle
        aria-label="Sort By"
        class="relative inline-flex text-xs text-white items-center gap-1 md:text-sm"
      >
        Sort By: <strong> {{ sort }} </strong>
        <!-- Arrow Down -->
        <div>
          <img
            [class.rotate-180]="dropdown.shown"
            class="duration-300"
            src="assets/shared/icon-arrow-down-white.svg"
            alt="Arrow Down"
          />
        </div>
        <!-- end Arrow Down -->
      </button>
      <!-- end Toggle -->

      <!-- Content -->
      <ng-template dropDownContent>
        <ul class="w-48 rounded-xl divide-y shadow-2xl overflow-hidden mt-3">
          <li
            *ngFor="let s of sorts"
            (click)="changeSort.emit(s)"
            class="cursor-pointer duration-300 group flex font-md items-center justify-between bg-white px-4 py-3
        text-neutral-300 hover:text-accent hover:bg-secondary-200"
          >
            <!--            Current Filter-->
            {{ s }}
            <!--            end Current Filter-->

            <!-- Check Icon -->
            <i
              *ngIf="s === sort"
              class="duration-300 fa fa-check group-hover:translate-x-2"
            ></i>
            <!-- end Check Icon -->
          </li>
        </ul>
      </ng-template>
      <!-- end Content -->
    </lbk-dropdown>
  `,
})
export class SortByComponent {
  @Input() sorts!: SortFeedback[];
  @Input() sort!: SortFeedback;

  @Output() changeSort = new EventEmitter<SortFeedback>();
}
