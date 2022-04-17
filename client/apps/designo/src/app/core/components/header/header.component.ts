import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      #header
      class="container flex justify-between py-8 md:py-16 2xl:py-[67px]"
    >
      <!-- Menu -->
      <a aria-label="Logo" routerLink="/">
        <img
          class="max-w-[197px]"
          src="assets/shared/desktop/logo-dark.png"
          alt="Logo"
        />
      </a>
      <!-- end Menu -->

      <!-- Hamburger Menu -->
      <lbk-menu-one
        color="black"
        [shown]="(shown$ | async)!"
        (click)="toggleOverlay()"
        class="md:hidden"
      ></lbk-menu-one>
      <!-- end Hamburger Menu -->

      <!-- Tablet and Desktop Links -->
      <ul class="hidden gap-[42px] text-xs md:flex">
        <li>
          <a routerLink="/home" routerLinkActive="underline"> OUR COMPANY </a>
        </li>
        <li>
          <a routerLink="/locations" routerLinkActive="underline">LOCATIONS</a>
        </li>
        <li>
          <a routerLink="/contact" routerLinkActive="underline">CONTACT</a>
        </li>
      </ul>
      <!-- end Tablet and Desktop Links -->
    </header>

    <!-- Overlay -->
    <lbk-overlay></lbk-overlay>
    <!-- end Overlay -->
  `,
})
export class HeaderComponent implements OnInit {
  shown$!: Observable<boolean>;

  constructor(private readonly _headerService: HeaderService) {}

  ngOnInit(): void {
    this.shown$ = this._headerService.shown$;
  }

  toggleOverlay() {
    this._headerService.toggle();
  }
}
