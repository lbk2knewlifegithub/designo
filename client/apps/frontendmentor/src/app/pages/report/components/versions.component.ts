import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbk-versions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>REPORT VERSION</h2>
    <ul>
      <li>
        <a [routerLink]="['/report']">
          Latest -5 May 2022

          <!-- Angle Down -->
          <i class="fa-solid fa-angle-down"></i>
          <!-- end Angle Down -->
        </a>
      </li>
    </ul>
  `,
})
export class VersionsComponent {}
