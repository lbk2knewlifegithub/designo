import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AuthFacade } from '@lbk/auth';
import { identifyLink, Link } from '@lbk/models';

@Component({
  selector: 'lbk-nav-mobile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid bg-white border-b shadow-xl">
      <!-- Login with Github -->
      <li *loggedIn="false">
        <a [href]="loginGithubURL" (mousedown)="close()">
          <!-- Link Icon -->
          <i class="fa-brands fa-github text-lg"></i>
          <!-- end Link Icon -->

          <!-- Link Name -->
          <span class="text-xs font-bold italic">LOGIN WITH GITHUB</span>
          <!-- end Link Name -->
        </a>
      </li>
      <!-- end Login with Github -->

      <ng-container
        *ngFor="let link of links; trackBy: identifyLink; index as i"
      >
        <li class="group">
          <a
            (click)="close()"
            *loggedIn="link.loggedIn; skip: link.skip"
            [routerLink]="link.href"
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

      <!-- Logout -->
      <li *loggedIn="true">
        <button
          (mousedown)="logout()"
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
      <!-- end Logout -->
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

  loginGithubURL!: string;

  constructor(private readonly _authFacade: AuthFacade) {}

  ngOnInit(): void {
    this._initLinks();
    this.loginGithubURL = this._authFacade.loginGithubURL;
  }

  private _initLinks() {
    this.links = [
      {
        name: 'HOME',
        href: '/',
        icon: 'fa-house',
        loggedIn: true,
      },
      {
        name: 'CHALLENGES',
        href: '/challenges',
        icon: 'fa-laptop-file',
        skip: true,
      },
      {
        name: 'SOLUTIONS',
        href: '/shell/solutions',
        icon: 'fa-code',
        skip: true,
      },
      {
        name: 'RESOURCES',
        href: '/resources',
        icon: 'fa-globe',
        skip: true,
      },
      {
        name: 'DASHBOARD',
        href: '/dashboard',
        icon: 'fa-gauge-high',
        loggedIn: true,
      },
      {
        name: 'PROFILE',
        href: '/profile',
        icon: 'fa-user',
        loggedIn: true,
      },
      {
        name: 'SETTINGS',
        href: '/setting',
        icon: 'fa-sliders',
        loggedIn: true,
      },
      {
        name: 'UNLOCK',
        href: '/unlock-pro',
        icon: 'fa-unlock-keyhole',
        skip: true,
      },
      {
        name: 'HIRE DEVELOPERS',
        href: '/hiring',
        icon: 'fa-user-group',
        skip: true,
      },
    ];
  }

  logout() {
    this.close();
    this._authFacade.logout();
  }

  close() {
    this.shownChange.emit(false);
  }
}
