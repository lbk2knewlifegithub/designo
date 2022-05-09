import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeIn, fadeOut, slideInRight, slideOutRight } from '@lbk/anims';
import { Observable } from 'rxjs';
import { HomeFacade } from '../state/home.facade';

const DURATION_ANIMATION = 100;

@Component({
  selector: 'lbk-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      *ngIf="isOpen$ | async"
      @fadeIn
      @fadeOut
      class="fixed top-[70px] left-0 h-full w-full bg-black/30"
    >
      <nav
        @slideInRight
        @slideOutRight
        class="bg-secondary absolute top-0 right-0 p-6 h-full w-[270px]"
      >
        <!--        Categories-->
        <lbk-feedback-categories></lbk-feedback-categories>
        <!--        end Categories-->

        <!-- Road Map -->
        <lbk-roadmap-summary class="block mt-6"></lbk-roadmap-summary>
        <!-- end Road Map -->
      </nav>
    </section>
  `,
  animations: [
    // Fade
    fadeIn({ duration: DURATION_ANIMATION }),
    fadeOut({ delay: DURATION_ANIMATION }),
    // Slide
    slideInRight({ delay: DURATION_ANIMATION }),
    slideOutRight({ duration: DURATION_ANIMATION }),
  ],
})
export class SideBarComponent implements OnInit {
  isOpen$!: Observable<boolean>;

  constructor(private readonly _facade: HomeFacade) {}

  ngOnInit(): void {
    this.isOpen$ = this._facade.shownSidebar$;
  }

  identifyTag(index: number, tag: string) {
    return tag;
  }
}
