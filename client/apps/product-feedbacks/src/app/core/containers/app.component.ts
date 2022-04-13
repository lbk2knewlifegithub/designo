import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  constructor(private readonly _navigationService: NavigationService) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  ngOnInit(): void {
    const splashScreen = document.getElementById(
      'splash-screen'
    ) as HTMLElement;
    splashScreen.classList.add('slide-out-top');
    splashScreen.addEventListener('transitionend', () => {
      splashScreen.remove();
    });
  }
}
