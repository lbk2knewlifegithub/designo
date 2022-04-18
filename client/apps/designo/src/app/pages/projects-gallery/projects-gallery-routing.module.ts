import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsGalleryPageComponent } from './containers';
import { ProjectsGalleryResolver } from './resolvers';
import { ProjectsGalleryExistsGuard } from './guards';

const routes: Routes = [
  {
    path: ':gallery-slug',
    component: ProjectsGalleryPageComponent,
    canActivate: [ProjectsGalleryExistsGuard],
    resolve: {
      gallery: ProjectsGalleryResolver,
    },
  },
  {
    path: '',
    redirectTo: '/projects-gallery/web-design',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsGalleryRoutingModule {}
