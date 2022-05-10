import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-bio-input-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <h2 class="font-bold">BIO</h2>

      <ul class="mt-1 grid gap-4">
        <!-- Website -->
        <li>
          <lbk-input
            [input]="{
              parent: parent,
              label: 'Website',
              controlName: 'website',
              groupName: 'bio',
              placeholder: 'e.g. https://www.youtube.com'
            }"
          ></lbk-input>
        </li>
        <!-- end Website -->

        <!-- Content -->
        <li>
          <lbk-content-input [parent]="parent"></lbk-content-input>
        </li>
        <!-- end Content -->

        <!-- Learning -->
        <li>
          <lbk-learning-input [parent]="parent"></lbk-learning-input>
        </li>
        <!-- end Learning -->
      </ul>
    </div>
  `,
})
export class BioInputGroupComponent {
  @Input() parent!: FormGroup;
}
