import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="container flex justify-center mt-20">
      <div class="text-center grid place-items-center">
        <img
          src="https://avatars.githubusercontent.com/u/78838140?v=4"
          alt="Le binh Khang"
        />
        <h1 class="text-2xl font-bold">Hi! I'am Le Binh Khang</h1>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
