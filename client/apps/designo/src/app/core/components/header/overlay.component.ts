import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fadeIn, fadeOut, listInLeft, listOutLeft } from '@lbk/anims';
import { UnSubscribe } from '@lbk/comps';
import { delay, Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Component({
  selector: 'lbk-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="shown$ | async"
      @fadeIn
      @fadeOut
      class="fixed inset-0 top-[93.5px] bg-black-200/50 z-50"
    >
      <div class="container bg-black-200 py-12">
        <ul
          @listInLeft
          @listOutLeft
          class="grid gap-8 text-white uppercase text-[24px] leading-[25px] tracking-[2px]"
        >
          <!-- About Page -->
          <li>
            <a routerLink="/about" routerLinkActive="underline">
              OUR COMPANY
            </a>
          </li>
          <!-- end About Page -->

          <!-- Location Route -->
          <li>
            <a routerLink="/locations" routerLinkActive="underline"
              >LOCATIONS</a
            >
          </li>
          <!-- end Location Route -->

          <!-- Contact Route -->
          <li>
            <a routerLink="/contact" routerLinkActive="underline">CONTACT</a>
          </li>
          <!-- end Contact Route -->
        </ul>
      </div>
    </div>
  `,
  animations: [
    fadeOut({ delay: 300 }),
    listInLeft({ item: 'li', delay: 300 }),
    listOutLeft({ item: 'li' }),
    fadeIn(),
  ],
})
export class OverlayComponent extends UnSubscribe implements OnInit {
  shown$!: Observable<boolean>;

  constructor(
    private readonly _router: Router,
    private readonly _headerService: HeaderService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.shown$ = this._headerService.shown$;
    this.appendSub = this._router.events.pipe(delay(300)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this._headerService.shown) return;
        this._headerService.shown = false;
      }
    });
  }
}
