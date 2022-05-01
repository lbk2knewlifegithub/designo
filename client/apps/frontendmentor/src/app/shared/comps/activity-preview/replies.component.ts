import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-replies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex text-xs justify-between bg-primary/5 px-6 py-5 rounded-lg lg:text-sm"
    >
      <span> This comment has received <strong>1 reply</strong> </span>

      <!-- Toggle Button -->
      <button (click)="toggle()" class="text-primary underline">
        {{ shown ? 'Hide' : 'View all' }}
      </button>
      <!-- end Toggle Button -->
    </div>

    <ng-container *ngIf="shown">
      <ul class="mt-4 md:mt-6">
        <li>
          <div class="flex items-center gap-3">
            <!-- User Image -->
            <img
              class="w-12 h-12 border-2 rounded-full"
              src="https://avatars.githubusercontent.com/u/75424016?v=4"
              alt=""
            />
            <!-- end User Image -->

            <div class="flex flex-wrap items-center gap-x-4">
              <div class="font-medium text-sm inline-flex items-center gap-2">
                <!-- User Name -->
                <a routerLink="/">Kratos012</a>
                <!-- end User Name -->
              </div>

              <div class="flex gap-2 text-xs italic font-medium">
                <!-- Point -->
                50
                <!-- end Point -->

                <!-- Pipe -->
                <span class="h-4 w-[2px] bg-dark/40"></span>
                <!-- end Pipe -->

                <!-- Github Username -->
                Posted 32 minutes ago
                <!-- end Github Username -->
              </div>
            </div>
          </div>

          <div class="mt-2 lg:mt-5 md:flex md:items-start md:gap-6 md:mt-4">
            <div class="vertical hidden md:block">
              <lbk-vote>10</lbk-vote>
            </div>
            <!-- Questions -->
            <p class="text-sm lg:text-base">
              I had problems adjusting the width on bigger size screens. I tried
              everything I could to no avail, thus finally gave up. *There are
              lots of parts of my code I'm unsure of. In my html, I used
              sections instead of divs. That was intentional, but don't know if
              it's right. My css is a mess i think, coz I had issues with view
              port as mentioned earlier. Any help will be highly appreciated.
            </p>
            <!-- end Questions -->
          </div>
          <!-- Vote  -->
          <div class="block mt-4 md:hidden">
            <lbk-vote>10</lbk-vote>
          </div>
          <!-- end Vote  -->
        </li>
      </ul>
    </ng-container>
  `,
})
export class RepliesComponent {
  shown = true;

  /**
   * - Toggle
   */
  toggle() {
    this.shown = !this.shown;
  }
}
