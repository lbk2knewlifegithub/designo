import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { identifyLink, Link } from '@lbk/models';

@Component({
  selector: 'lbk-nav-mobile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid bg-white border-b shadow-xl">
      <ng-container
        *ngFor="let link of links; trackBy: identifyLink; index as i"
      >
        <li class="group">
          <a
            (click)="close()"
            [routerLink]="[link.href]"
            [class.border-t]="i !== 0"
          >
            <!-- Link Icon -->
            <i [class]="['fa-solid', link.icon]"></i>
            <!-- end Link Icon -->

            <!-- Link Name -->
            <span class=" text-xs font-bold italic">
              {{ link.name }}

              <span
                *ngIf="i === 7"
                class="ml-1 inline-block badge badge-primary rounded px-1 text-xs p-[1px] group-hover:bg-error"
                >PRO</span
              >
            </span>
            <!-- end Link Name -->
          </a>
        </li>
      </ng-container>

      <li>
        <button
          (close)="close()"
          class="w-full border-t text-error hover:!bg-error hover:!text-white"
        >
          <!-- Link Icon -->
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <!-- end Link Icon -->

          <!-- Link Name -->
          <span class="text-xs font-bold italic"> SIGN OUT </span>
          <!-- end Link Name -->
        </button>
      </li>
    </ul>
  `,
  styles: [
    `
      ul {
        li {
          button,
          a {
            @apply py-6 px-2 flex items-center gap-4 pl-6 md:pr-14;
            @apply duration-300 hover:bg-primary hover:text-white;
          }
        }
      }
    `,
  ],
})
export class NavMobileComponent implements OnInit {
  @Input() shown!: boolean;
  @Output() shownChange = new EventEmitter<boolean>();

  links!: Link[];
  identifyLink = identifyLink;

  ngOnInit(): void {
    this._initLinks();
  }

  private _initLinks() {
    this.links = [
      {
        name: 'HOME',
        href: '/',
        icon: 'fa-house',
      },
      {
        name: 'CHALLENGES',
        href: '/challenges',
        icon: 'fa-laptop-file',
      },
      {
        name: 'SOLUTIONS',
        href: '/shell/solutions',
        icon: 'fa-code',
      },
      {
        name: 'RESOURCES',
        href: '/resources',
        icon: 'fa-globe',
      },
      {
        name: 'DASHBOARD',
        href: '/dashboard',
        icon: 'fa-gauge-high',
      },
      {
        name: 'PROFILE',
        href: '/profile',
        icon: 'fa-user',
      },
      {
        name: 'SETTINGS',
        href: '/setting',
        icon: 'fa-sliders',
      },
      {
        name: 'UNLOCK',
        href: '/unlock-pro',
        icon: 'fa-unlock-keyhole',
      },
      {
        name: 'HIRE DEVELOPERS',
        href: '/hiring',
        icon: 'fa-user-group',
      },
    ];
  }

  close() {
    this.shownChange.emit(false);
  }
}
