import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { AuthFacade } from '../auth.facade';

@Component({
  selector: 'lbk-logged-in',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8">
      <ul
        class="grid place-items-center gap-10 md:place-items-start md:grid-cols-2 md:gap-6"
      >
        <li class="grid gap-4 place-items-center">
          <!-- Logout Icon -->
          <img
            class="w-[300px] h-[200px] object-cover overflow-hidden"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/264/817/small/exit-from-door-vector.jpg"
            alt="Logout Button"
          />
          <!-- end Logout Icon -->

          <!-- Logout Button -->
          <button
            (click)="close()"
            class="duration-100 bg-sky-500 rounded-lg text-white px-6 py-3 hover:bg-sky-600"
          >
            Logout
          </button>
          <!-- Logout Button-->
        </li>

        <li class="grid gap-4 place-items-center">
          <!-- Profile Icon -->
          <img
            class="w-[300px] h-[200px] object-cover overflow-hidden"
            src="https://static.vecteezy.com/system/resources/thumbnails/004/865/861/small/digital-profile-analysis-for-business-professional-on-hiring-new-employee-free-vector.jpg"
            alt="Logout Button"
          />
          <!-- end Profile Icon -->

          <!-- Profile Button -->
          <a
            routerLink="/profile"
            (click)="close()"
            class="duration-100 bg-orange-400 rounded-lg text-white px-6 py-3 hover:bg-sky-600"
          >
            Profile
          </a>
          <!-- end Profile Button -->
        </li>
      </ul>
    </div>
  `,
})
export class LoggedInComponent {
  constructor(
    private readonly _ref: DialogRef,
    private readonly _authFacade: AuthFacade
  ) {}

  close() {
    this._ref.close();
  }

  logout() {
    this._ref.close();
    this._authFacade.logout();
  }
}
