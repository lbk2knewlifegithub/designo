import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { SlugPipeModule } from '@lbk/pipes';
import { COMPONENTS } from './components';
import { ProjectsGalleryPageComponent } from './containers';
import { ProjectsGalleryRoutingModule } from './projects-gallery-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsGalleryRoutingModule,
    // Shared Component From Designo

    // Shared Pipe From Libs
    SlugPipeModule,

    // Shared Component From Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, ProjectsGalleryPageComponent],
})
export class ProjectsGalleryModule {}
