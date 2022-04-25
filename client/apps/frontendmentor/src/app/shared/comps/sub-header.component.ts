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
    <nav class="border-b">
      <div class="container">
        <h2
          class="uppercase inline-block font-bold text-sm p-4 border-x ml-3 lg:ml-0 lg:px-6"
        >
          {{ title }}
        </h2>
      </div>
    </nav>
  `,
})
export class SubHeaderComponent {
  @Input() title!: string;
}

@NgModule({
  exports: [SubHeaderComponent],
  declarations: [SubHeaderComponent],
})
export class SubHeaderModule {}