import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeFacade } from '../state/home.facade';

@Component({
  selector: 'lbk-home-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <nav
        class="relative py-3 container flex items-center justify-between md:grid md:grid-cols-3 md:gap-3 md:pt-14 md:pb-10  xl:pt-0 xl:px-0 xl:flex xl:flex-col xl:gap-6 xl:w-full"
      >
        <!--          background mobile-->
        <img
          class="bg-img md:hidden"
          src="assets/suggestions/mobile/background-header.png"
          alt="Background Header Mobile"
        />
        <!--          end background mobile-->

        <div
          class="text-white md:relative  md:h-full md:flex md:flex-col md:justify-end md:p-6 md:rounded-xl md:overflow-hidden xl:w-full xl:h-[137px]"
        >
          <!--          background tablet-->
          <img
            class="hidden bg-img md:block"
            src="assets/suggestions/tablet/background-header.png"
            alt="Background Header"
          />
          <!--          end background table-->

          <!--          Logo-->
          <h4 class="md:text-xl xl:text-lg">Frontend Mentor</h4>
          <span class="font-medium text-xs  md:text-lg xl:text-base"
            >Feedback Board</span
          >
          <!--          end Logo-->
        </div>

        <!--        Categories-->
        <lbk-feedback-categories
          class="hidden md:h-full md:block"
        ></lbk-feedback-categories>
        <!--        end Categories-->

        <!--        Roadmap Summary-->
        <lbk-roadmap-summary
          class="hidden md:block xl:w-full"
        ></lbk-roadmap-summary>
        <!--        end Roadmap Summary-->

        <div class="flex gap-4 items-center md:hidden">
          <!-- profile -->
          <lbk-profile-button></lbk-profile-button>
          <!-- end profile -->

          <!-- Hamburger Button -->
          <lbk-menu-one
            [shown]="(shownSideBar$ | async)!"
            (click)="onMenu()"
          ></lbk-menu-one>
          <!-- end Hamburger Button -->
        </div>
      </nav>
    </header>
  `,
})
export class HomeHeaderComponent implements OnInit {
  shownSideBar$!: Observable<boolean>;

  constructor(public _facade: HomeFacade) {}

  ngOnInit(): void {
    this.shownSideBar$ = this._facade.shownSidebar$;
  }

  onMenu() {
    this._facade.toggleSideBar();
  }
}
