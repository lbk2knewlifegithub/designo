import { Component, OnInit } from '@angular/core';
import { Link } from '@lbk/models';

@Component({
  selector: 'lbk-explore',
  template: `
    <h2 class="text-xs font-bold">EXPLORE</h2>

    <ul class="mt-4 text-sm grid gap-2">

      <li *ngFor="let link of links">
        <a class="link link-error" [routerLink]="[link.href]">{{
          link.name
        }}</a>

      </li>
    </ul>
  `,
})
export class ExploreComponent implements OnInit {
  links!: Link[];

  ngOnInit(): void {
    this._initLinks();
  }

  private _initLinks() {
    this.links = [
      {
        href: '/challenges',
        name: 'Challenges',
      },
      {
        href: '/solutions',
        name: 'Solutions',
      },
      {
        href: '/resources',
        name: 'Resources',
      },
      {
        href: '/unlock-pro',
        name: 'Unlock PRO',
      },
      {
        href: '/hiring',
        name: 'Hire Developer',
      },
    ];
  }
}
