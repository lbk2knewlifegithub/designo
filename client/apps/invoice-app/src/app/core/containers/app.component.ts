import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationService } from '@lbk/services';

@Component({
  selector: 'lbk-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  constructor(private readonly _navigationService: NavigationService) {}
}
