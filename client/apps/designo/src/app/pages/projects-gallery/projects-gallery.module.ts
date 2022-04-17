import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { COMPONENTS } from './components';
import { ProjectsGalleryPageComponent } from './containers';
import { ProjectsGalleryRoutingModule } from './projects-gallery-routing.module';
import { ProjectLinksModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    ProjectsGalleryRoutingModule,
    // Shared Component From Designo
    ProjectLinksModule,

    // Shared Directives From Libs
    ScrollToModule,

    // Shared Component From Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, ProjectsGalleryPageComponent],
})
export class ProjectsGalleryModule {}
