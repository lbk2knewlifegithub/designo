import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fadeIn, fadeInUp, fadeOut, zoomOut } from '@lbk/anims';
import { Unsubscriber } from '@lbk/comps';
import { filter, map, Observable, startWith, combineLatest } from 'rxjs';
import { LayoutFacade } from '../../../state';
import { CartFacade } from './../../../state/facade/cart.facade';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  animations: [
    fadeInUp({ delay: 300 }),
    zoomOut(),
    fadeIn(),
    fadeOut({ delay: 300 }),
  ],
})
export class HeaderComponent extends Unsubscriber implements OnInit {
  shownNav$!: Observable<boolean>;
  shownCart$!: Observable<boolean>;

  numberOfItems$!: Observable<number>;
  isHome$!: Observable<boolean>;

  shown$!: Observable<boolean>;

  constructor(
    private readonly _layoutFacade: LayoutFacade,
    private readonly _numberOfItemsFacade: CartFacade,
    private readonly _router: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.shownNav$ = this._layoutFacade.shownNav$;
    this.shownCart$ = this._layoutFacade.shownCart$;
    this.shown$ = combineLatest([this.shownNav$, this.shownCart$]).pipe(
      map(([shownNav, shownCart]) => shownNav || shownCart)
    );

    this.numberOfItems$ = this._numberOfItemsFacade.numberOfItems$;

    this.isHome$ = this._router.events.pipe(
      startWith(this._router),
      filter((event) => event instanceof NavigationEnd),
      map((event) => {
        event = event as NavigationEnd;
        return event.url === '/' || event.url.startsWith('/home');
      })
    );
  }

  /**
   * - Toggle Cart
   */
  toggleCartOverlay() {
    this._layoutFacade.toggleCartOverlay();
  }

  /**
   * - Toggle Nav
   */
  toggleNavOverlay() {
    this._layoutFacade.toggleNavOverlay();
  }

  /**
   * - Close All Overlays
   */
  closeAll() {
    this._layoutFacade.closeAll();
  }
}
