// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { identifyUserMinimal, UserMinimal } from '@lbk/fm/shared';

@Component({
  selector: 'lbk-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <li
        class="flex gap-4 items-center relative rounded-lg overflow-hidden bg-white border shadow-sm p-4 md:p-5"
        *ngFor="let user of users; trackBy: identifyUserMinimal; index as i"
      >
        <img
          class="w-[50px] aspect-square rounded-full"
          [src]="user.image"
          [alt]="user.name"
        />

        <div class="text-xs">
          <!-- Name -->
          <h3 class="text-sm font-bold">{{ user.name }}</h3>
          <!-- end Name -->

          <!-- username -->
          <span class="text-secondary"> @{{ user.username }} </span>
          <!-- end username -->

          <!-- Points -->
          <h3 class="font-bold text-primary text-sm">
            {{ user.points | number }}
          </h3>
          <!-- end Points -->
        </div>
      </li>
    </ul>
  `,
})
export class UserListComponent {
  @Input() users!: UserMinimal[];
  identifyUserMinimal = identifyUserMinimal;
}
