import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { slideInUp, slideOutDown } from '@lbk/anims';
import { ScrollService } from '@lbk/services';
import { fromEvent, map, Observable } from 'rxjs';

@Component({
  selector: 'lbk-scroll-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      @slideInUp
      @slideOutDown
      *ngIf="shown$ | async"
      class="fixed bottom-5 right-5"
    >
      <button
        (click)="scrollToTop()"
        class="w-12 h-12 rounded-full bg-{{
          bgColor
        }} grid place-content-center duration-300 hover:translate-y-1"
        aria-label="Scroll To Top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill="white"
            d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z"
          />
        </svg>
      </button>
    </div>
  `,
  animations: [slideInUp(), slideOutDown()],
})
export class ScrollToTopComponent implements OnInit {
  @Input() offset = 500;
  @Input() bgColor = 'red-500';
  shown$!: Observable<boolean>;

  constructor(private readonly _scrollService: ScrollService) {}
  ngOnInit(): void {
    this.shown$ = fromEvent(window, 'scroll').pipe(
      map(() => window.scrollY > this.offset)
    );
  }

  scrollToTop() {
    this._scrollService.scrollToTop();
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [ScrollToTopComponent],
  declarations: [ScrollToTopComponent],
})
export class ScrollToTopModule {}
