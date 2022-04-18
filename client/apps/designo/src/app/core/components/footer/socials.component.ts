import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { identifyLink, Link } from '@lbk/models';

@Component({
  selector: 'lbk-socials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <li *ngFor="let link of links; trackBy: indentifyLink">
        <a [attr.aria-label]="link.name" href="#">
          <i [classList]="link.icon"></i>
        </a>
      </li>
    </ul>
  `,
  styles: [
    `
      ul {
        @apply flex gap-3 md:gap-4;
        li {
          a {
            @apply text-[1.5rem] text-peach-200 duration-300;
            @apply hover:text-peach;
          }
        }
      }
    `,
  ],
})
export class SocialsComponent implements OnInit {
  links!: Link[];
  indentifyLink = identifyLink;

  ngOnInit(): void {
    this.links = [
      {
        name: 'Facebook',
        href: '',
        icon: 'fa-brands fa-facebook-square',
      },
      {
        name: 'Youtube',
        href: '',
        icon: 'fa-brands fa-youtube',
      },
      {
        name: 'Twitter',
        href: '',
        icon: 'fa-brands fa-twitter',
      },
      {
        name: 'Pinterest',
        href: '',
        icon: 'fa-brands fa-pinterest',
      },
      {
        name: 'Instagram',
        href: '',
        icon: 'fa-brands fa-instagram',
      },
    ];
  }
}
