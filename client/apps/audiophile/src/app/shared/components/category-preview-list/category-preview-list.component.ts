import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import * as fromData from '../../data';
import { CategoryPreview, identifyCategoryPreview } from '../../models';

@Component({
  selector: 'lbk-category-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <ul class="grid gap-[68px] md:grid-cols-3 md:gap-[10px] 2xl:gap-[30px]">
        <ng-container
          *ngFor="
            let categoryPreview of categoriesPreview;
            trackBy: identifyCategoryPreview
          "
        >
          <li>
            <lbk-category-preview
              [categoryPreview]="categoryPreview"
            ></lbk-category-preview>
          </li>
        </ng-container>
      </ul>
    </section>
  `,
})
export class CategoryPreviewListComponent implements OnInit {
  @Input() categoriesPreview!: CategoryPreview[];
  identifyCategoryPreview = identifyCategoryPreview;

  ngOnInit(): void {
    this.categoriesPreview = fromData.categoriesPreview;
  }
}
