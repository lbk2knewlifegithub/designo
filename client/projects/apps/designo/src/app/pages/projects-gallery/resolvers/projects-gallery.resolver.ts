import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { fromData, ProjectsGallery, ProjectSlug } from '../../../shared';

@Injectable({ providedIn: 'root' })
export class ProjectsGalleryResolver implements Resolve<ProjectsGallery> {
  resolve(route: ActivatedRouteSnapshot): ProjectsGallery {
    const slug = route.params['gallery-slug'] as ProjectSlug;
    return fromData.projectsGalleryMap.get(slug) as ProjectsGallery;
  }
}
