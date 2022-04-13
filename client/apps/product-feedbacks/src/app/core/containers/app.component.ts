import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from '@lbk/services';

// import {CAROUSEL_ROUTE_ANIMATION} from "@animations";

@Component({
  selector: 'lbk-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Router Outlet -->
    <!--    <div class="will-change-auto transform-gpu" [@routeAnimations]="prepareRoute(outlet)">-->
    <!--      <router-outlet #outlet="outlet"></router-outlet>-->
    <!--    </div>-->

    <router-outlet></router-outlet>
    <!-- end Router Outlet -->

    <lbk-required-login></lbk-required-login>
    <lbk-footer></lbk-footer>
  `,
  // animations: [CAROUSEL_ROUTE_ANIMATION],
})
export class AppComponent {
  constructor(private readonly _navigationService: NavigationService) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
