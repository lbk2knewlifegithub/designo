import { fadeInUp } from '@lbk/anims';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  animations: [fadeInUp()],
})
export class HomePageComponent {}
