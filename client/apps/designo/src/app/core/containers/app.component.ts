import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScrollService } from '@lbk/services';

@Component({
  selector: 'lbk-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-header></lbk-header>
    <router-outlet></router-outlet>
    <lbk-footer></lbk-footer>
    <lbk-scroll-to-top bgColor="peach-200"></lbk-scroll-to-top>
  `,
})
export class AppComponent implements OnInit {
  constructor(private readonly _scrollService: ScrollService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // this._scrollService.scrollToBottom();
  }
}
