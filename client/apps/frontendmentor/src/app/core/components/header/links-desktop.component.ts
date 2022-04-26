import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-links-desktop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="italic font-bold flex gap-4 text-sm">
      <!-- Challenges -->
      <li>
        <a href="">CHALLENGES</a>
      </li>
      <!-- end Challenges -->

      <!-- Solutions -->
      <li>
        <a href="">SOLUTIONS</a>
      </li>
      <!-- end Solutions -->

      <!-- Resources -->
      <li>
        <a href="">RESOURCES</a>
      </li>
      <!-- end Resources -->

      <!-- Unlock Pro -->
      <li>
        <a routerLink="/unlock-pro" class="flex gap-2 items-center"
          >UNLOCK
          <span class="text-xs rounded-sm bg-primary text-white py-[2px] px-2"
            >PRO</span
          >
        </a>
      </li>
      <!-- end Unlock Pro -->

      <!-- Hire Developer -->
      <li>
        <a routerLink="/hiring">HIRE DEVELOPERS</a>
      </li>
      <!-- end Hire Developer -->
    </ul>
  `,
})
export class LinksDesktopComponent {}
