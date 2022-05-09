import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  selector: 'lbk-sub-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="relative border-b">
      <div class="container  flex justify-between">
        <h2
          class="uppercase inline-block font-bold p-4 border-x ml-3 lg:ml-0 lg:text-lg lg:px-8"
        >
          {{ title }}
        </h2>

        <ng-content></ng-content>
      </div>
    </nav>
  `,
})
export class SubHeaderComponent {
  @Input() title!: string;
}

@NgModule({
  imports: [CommonModule],
  exports: [SubHeaderComponent],
  declarations: [SubHeaderComponent],
})
export class SubHeaderModule {}
