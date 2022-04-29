import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { User } from '../models';

@Component({
  selector: 'lbk-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-image
      [singleImage]="user.image"
      classImage="w-[50px] aspect-square rounded-full"
      [alt]="user.name"
    ></lbk-image>
  `,
  styles: [
    `
      :host {
        @apply relative;
      }
    `,
  ],
})
export class AvatarComponent {
  @Input() user!: Pick<User, 'image' | 'isPremium' | 'name'>;
}

@NgModule({
  imports: [
    CommonModule,
    // Shared Components From Libs
    ImageModule,
  ],
  exports: [AvatarComponent],
  declarations: [AvatarComponent],
})
export class AvatarModule {}
