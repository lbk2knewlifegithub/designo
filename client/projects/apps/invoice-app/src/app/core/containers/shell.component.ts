import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CAROUSEL_ROUTE_ANIMATION } from '@lbk/anims';
import { UserFacade } from '@lbk/user';
import { Observable } from 'rxjs';
import { LayoutFacade } from '../../state';

@Component({
  selector: 'lbk-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-header
      [darkTheme]="(darkTheme$ | async)!"
      [openOverlay]="(openOverlay$ | async)!"
      [loggedIn]="(loggedIn$ | async)!"
      (toggleTheme)="toggleTheme()"
      (logout)="logout()"
    ></lbk-header>

    <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    <!-- <lbk-footer></lbk-footer> -->
  `,
  animations: [CAROUSEL_ROUTE_ANIMATION],
})
export class ShellComponent implements OnInit {
  openOverlay$!: Observable<boolean>;
  darkTheme$!: Observable<boolean>;
  loggedIn$!: Observable<boolean>;

  constructor(
    private readonly _userFacade: UserFacade,
    private readonly _layoutFacade: LayoutFacade
  ) {}

  ngOnInit(): void {
    this.loggedIn$ = this._userFacade.loggedIn$;
    this._layoutFacade.loadTheme();
  }

  /**
   * - Toggle Theme
   */
  toggleTheme() {
    this._layoutFacade.toggleTheme();
  }

  logout() {
    this._userFacade.logout();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
