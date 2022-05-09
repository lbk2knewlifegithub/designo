import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@lbk/services';
import { CartFacade } from '../../state';

@Component({
  selector: 'lbk-root',
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
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _cartFacade: CartFacade,
    private readonly _navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this._cartFacade.loadCart();
  }
}
