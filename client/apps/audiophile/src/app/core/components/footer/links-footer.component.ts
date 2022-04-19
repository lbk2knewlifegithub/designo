import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { identifyLink, Link } from '@lbk/models';

@Component({
  selector: 'lbk-links-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul
      class="flex flex-col gap-4 uppercase text-center text-xs font-bold text-white md:flex-row md:gap-9"
    >
      <li *ngFor="let link of links; trackBy: identifyLink">
        <a
          class="link"
          routerLinkActive="text-primary-900"
          [routerLink]="link.href"
          >{{ link.name }}</a
        >
      </li>
    </ul>
  `,
})
export class LinksFooterComponent implements OnInit {
  links!: Link[];
  identifyLink = identifyLink;

  ngOnInit(): void {
    this._initLinks();
  }

  private _initLinks() {
    this.links = [
      {
        name: 'Home',
        href: '/home',
      },

      {
        name: 'Headphones',
        href: '/category/headphones',
      },
      {
        name: 'Speakers',
        href: '/category/speakers',
      },
      {
        name: 'Earphones',
        href: '/category/earphones',
      },
    ];
  }
}
