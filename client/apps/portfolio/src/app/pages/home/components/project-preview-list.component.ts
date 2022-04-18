import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { identifyLink, Link } from '@lbk/models';
import { fromData } from '../../../shared';

@Component({
  selector: 'lbk-project-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid place-items-center gap-20 lg:gap-8 lg:grid-cols-2">
      <li *ngFor="let link of links; trackBy: identifyLink">
        <lbk-project-preview [link]="link"></lbk-project-preview>
      </li>
    </ul>
  `,
})
export class ProjectPreviewListComponent implements OnInit {
  links!: Link[];
  identifyLink = identifyLink;

  ngOnInit(): void {
    this.links = fromData.projectLinks;
  }
}
