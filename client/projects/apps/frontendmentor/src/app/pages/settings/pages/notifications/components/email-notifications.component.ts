import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-email-notifications-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class=" bg-white border shadow-md rounded-lg p-6 xl:p-8">
      <h1 class="font-bold text-lg sm:text-2xl">EMAIL NOTIFICATIONS</h1>

      <form class="mt-4 sm:mt-10">
        <ul>
          <li>
            <input type="checkbox" />
            Send me an email when someone comments on my solution.
          </li>

          <li>
            <input type="checkbox" />
            Send me an email when someone replies to a comment I made.
          </li>

          <li>
            <input type="checkbox" />
            Send me an email when someone mentions me in a comment.
          </li>

          <li>
            <input type="checkbox" />
            Send me an email when I earn an achievement.
          </li>
        </ul>

        <div class="mt-4 flex justify-end sm:mt-10">
          <button class="btn btn-error font-bold italic px-10 xm:px-16">
            UPDATE NOTIFICATIONS
          </button>
        </div>
      </form>
    </section>
  `,
  styles: [
    `
      ul {
        @apply grid gap-4 text-sm sm:text-base md:gap-6;
        li {
          @apply flex gap-4 items-center;
        }
      }
    `,
  ],
})
export class EmailNotificationsFormComponent {}
