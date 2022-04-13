import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'lbk-menu-one',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [class.shown]="shown">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  `,
  styleUrls: ['./menu-one.component.scss'],
})
export class MenuOneComponent {
  @Input() shown!: boolean;
}

@NgModule({
  imports: [CommonModule],
  exports: [MenuOneComponent],
  declarations: [MenuOneComponent],
})
export class MenuOneModule {}
