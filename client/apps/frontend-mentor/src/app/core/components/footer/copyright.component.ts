import { Component } from '@angular/core';

@Component({
  selector: 'lbk-copyright',
  template: `
    <div class="text-xs text-secondary pt-6 border-t-4 pb-4">
      <p>© Frontend Mentor 2019 - 2022</p>

      <ul class="flex gap-4 mt-3">
        <li>
          <a href=""> Terms </a>
        </li>

        <li>
          <a href=""> Cookie </a>
        </li>

        <li>
          <a href="">Privacy Policy</a>
        </li>

        <li>
          <a href=""> License </a>
        </li>
      </ul>
    </div>
  `,
})
export class CopyrightComponent {}
