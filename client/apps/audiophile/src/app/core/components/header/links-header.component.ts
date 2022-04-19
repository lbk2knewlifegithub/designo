import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { identifyLink, Link } from '@lbk/models';

@Component({
  selector: 'lbk-links-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="flex gap-8 text-white uppercase text-xs font-bold">
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
export class LinksHeaderComponent implements OnInit {
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
