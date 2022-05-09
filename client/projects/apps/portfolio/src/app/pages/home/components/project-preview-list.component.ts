import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromData, identifyProject, Project } from '../../../shared';

@Component({
  selector: 'lbk-project-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid place-items-center gap-20 lg:gap-8 lg:grid-cols-2">
      <li *ngFor="let project of projects; trackBy: identifyProject">
        <lbk-project-preview [project]="project"></lbk-project-preview>
      </li>
    </ul>
  `,
})
export class ProjectPreviewListComponent implements OnInit {
  projects!: Project[];
  identifyProject = identifyProject;

  ngOnInit(): void {
    this.projects = fromData.projects;
  }
}
