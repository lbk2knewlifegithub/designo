import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { fromData } from '../../../shared';

@Injectable({ providedIn: 'root' })
export class ProjectsGalleryExistsGuard implements CanActivate {
  constructor(private readonly _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const gallerySlug = route.params['gallery-slug'];
    // Check Gallery Not Null
    if (!gallerySlug) return this._goHome();

    // Check Gallery Exists
    const founded = !!fromData.projectsGalleryMap.get(gallerySlug);

    if (!founded) return this._goHome();
    return true;
  }

  private _goHome(): boolean {
    this._router.navigateByUrl('/');
    return false;
  }
}
