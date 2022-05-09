import { Component, OnInit } from '@angular/core';
import { Link } from '@lbk/models';

@Component({
  selector: 'lbk-community',
  template: `
    <h2 class="text-xs font-bold">COMMUNITY</h2>

    <ul class="mt-4 text-sm grid gap-2">
      <li *ngFor="let link of links">
        <a class="link link-error" [routerLink]="[link.href]">{{
          link.name
        }}</a>
      </li>
    </ul>
  `,
})
export class CommunityComponent implements OnInit {
  links!: Link[];

  ngOnInit(): void {
    this._initLinks();
  }

  private _initLinks() {
    this.links = [
      {
        href: '/contact',
        name: 'Contact',
      },
      {
        href: '/',
        name: 'Slack',
      },
      {
        href: '/faq',
        name: 'FAQs',
      },
      {
        href: '/',
        name: 'Guidelines',
      },
      {
        href: '/',
        name: 'Blog',
      },
    ];
  }
}
