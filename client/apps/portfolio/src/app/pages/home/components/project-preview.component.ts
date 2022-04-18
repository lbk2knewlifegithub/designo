import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Link } from '@lbk/models';

@Component({
  selector: 'lbk-project-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <img [src]="link.image!.desktop" [alt]="link.image!.alt" />
      <a
        [href]="link.href"
        class="block text-3xl  font-bold mt-8 text-center hover:underline"
        >{{ link.name }}</a
      >
    </div>
  `,
})
export class ProjectPreviewComponent {
  @Input() link!: Link;
}
