import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { UnSubscribe } from '@lbk/comps';
import { filter, map } from 'rxjs';

@Component({
  selector: 'lbk-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Header -->
    <lbk-header></lbk-header>
    <!-- end Header -->

    <!-- Router Outlet -->
    <router-outlet></router-outlet>
    <!-- end Router Outlet -->

    <!-- Footer -->
    <lbk-footer></lbk-footer>
    <!-- end Footer -->

    <!-- Scroll To Top -->
    <lbk-scroll-to-top bgColor="peach-200"></lbk-scroll-to-top>
    <!-- end Scroll To Top -->
  `,
})
export class AppComponent extends UnSubscribe implements OnInit {
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _title: Title,
    private readonly _router: Router
  ) {
    super();
  }
  override ngOnInit(): void {
    super.ngOnInit();

    this.appendSub = this._router.events
      .pipe(
        filter((event) => event instanceof RoutesRecognized),
        map(
          (event) =>
            (event as RoutesRecognized | null)?.state?.root?.firstChild?.data[
              'title'
            ]
        )
      )
      .subscribe((title) => {
        if (!title) return this._title.setTitle('Designo');
        return this._title.setTitle(title);
      });
  }
}
