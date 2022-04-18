import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

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
export class AppComponent implements OnInit {
  ngOnInit(): void {
    AOS.init({
      once: true,
    });
  }
}
