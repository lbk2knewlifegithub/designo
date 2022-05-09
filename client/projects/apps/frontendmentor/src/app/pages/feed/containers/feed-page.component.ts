import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-feed-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./feed-page.component.html`,
})
export class FeedPageComponent {}
