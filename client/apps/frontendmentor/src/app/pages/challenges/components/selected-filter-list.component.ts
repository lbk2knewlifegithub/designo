import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'lbk-selected-filter-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="flex justify-center flex-wrap gap-2 sm:gap-4">
      <ng-container *ngFor="let query of querys">
        <li
          class="uppercase italic tracking-widest flex pr-2 gap-[2px] items-center badge badge-primary"
        >
          {{ query }}

          <!-- Delete Icon -->
          <button
            aria-label="Delete"
            (click)="remove.emit(query)"
            class="w-5 h-5 rounded-full grid content-center duration-300 hover:bg-white hover:text-primary"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          <!-- end Delete Icon -->
        </li>
      </ng-container>
    </ul>
  `,
})
export class SelectedFilterListComponent {
  @Input() querys!: string[];
  @Output() remove = new EventEmitter<string>();
}
