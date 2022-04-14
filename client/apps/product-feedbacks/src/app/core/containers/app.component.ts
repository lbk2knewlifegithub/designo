import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CAROUSEL_ROUTE_ANIMATION } from '@lbk/anims';
import { NavigationService, SplashScreenService } from '@lbk/services';

@Component({
  selector: 'lbk-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="will-change-auto transform-gpu"
      [@routeAnimations]="prepareRoute(outlet)"
    >
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  animations: [CAROUSEL_ROUTE_ANIMATION],
})
export class AppComponent {
  constructor(
    private readonly _navigationService: NavigationService,
    private readonly _splashScreenService: SplashScreenService
  ) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
