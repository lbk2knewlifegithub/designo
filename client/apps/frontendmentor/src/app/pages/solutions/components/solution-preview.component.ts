import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-solution-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Challenge Image -->
    <lbk-image
      classImage="duration-300 w-full max-h-[236px] sm:max-h-[288px] hover:scale-110"
      alt="challenge.name"
      singleImage="https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Screenshots/kjo672l6ggxxqkml6oan.jpg"
    ></lbk-image>
    <!-- end Challenge Image -->

    <div class="p-6">
      <!-- Name -->
      <a
        routerLink="/"
        class="text-2xl font-medium font-heading lg:text-2xl hover:underline"
      >
        huddle-landing-page-with-single-introductory-section-master Flexbox
      </a>
      <!-- end Name -->

      <div class="flex justify-between items-end mt-1 sm:mt-2 lg:mt-4">
        <!-- Languages -->
        <lbk-language-list [languages]="['html', 'css']"></lbk-language-list>
        <!-- end Languages -->

        <ul class="inline-flex gap-4">
          <!-- Number Of Comments -->
          <lbk-number-of of="comment">10</lbk-number-of>
          <!-- end Number of Comments -->

          <!-- Number Of Likes -->
          <lbk-number-of of="likes">10</lbk-number-of>
          <!-- end Number of Likes -->

          <!-- Number Of Bookmark -->
          <lbk-number-of of="bookmarks">1</lbk-number-of>
          <!-- end Number of Bookmark -->
        </ul>
      </div>

      <!-- User -->
      <div class="flex items-center gap-3 py-3 border-y mt-2">
        <!-- User Image -->
        <img
          class="w-12 h-12 rounded-full"
          src="https://avatars.githubusercontent.com/u/94619653?v=4"
          alt=""
        />
        <!-- end User Image -->

        <div class="grid">
          <div class="font-medium text-sm inline-flex items-center gap-2">
            <!-- User Name -->
            <a routerLink="/">Kratos012</a>
            <!-- end User Name -->

            <span class="w-1 h-1 rounded-full bg-dark"></span>

            <!-- Point -->
            <span class="font-bold text-primary">50</span>
            <!-- end Point -->
          </div>

          <div class="text-xs text-secondary italic">
            <!-- Github Username -->
            <h4>@Kratos012</h4>
            <!-- end Github Username -->

            <!-- Github Username -->
            <span>Submitted about 1 hour ago</span>
            <!-- end Github Username -->
          </div>
        </div>
      </div>
      <!-- end User -->

      <!-- Questions -->
      <p class="text-sm text-secondary mt-2 lg:text-base lg:mt-5">
        I had problems adjusting the width on bigger size screens. I tried
        everything I could to no avail, thus finally gave up. *There are lots of
        parts of my code I'm unsure of. In my html, I used sections instead of
        divs. That was intentional, but don't know if it's right. My css is a
        mess i think, coz I had issues with view port as mentioned earlier. Any
        help will be highly appreciated.
      </p>
      <!-- end Questions -->
    </div>
  `,
  styles: [
    `
      :host {
        @apply h-full block relative shadow-md rounded-lg overflow-hidden max-w-[395px];
      }
    `,
  ],
})
export class SolutionPreviewComponent {}
