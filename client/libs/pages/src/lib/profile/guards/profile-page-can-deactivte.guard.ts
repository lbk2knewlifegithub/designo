import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { Observable, of } from 'rxjs';
import { ProfilePageComponent } from '../containers';

@Injectable({ providedIn: 'root' })
export class ProfilePageCanDeactiveGuard
  implements CanDeactivate<ProfilePageComponent>
{
  constructor(private readonly _dialogService: DialogService) {}

  canDeactivate(profilePage: ProfilePageComponent): Observable<boolean> {
    const dirty = profilePage.signupForm.form.dirty;
    if (!dirty) return of(true);

    return this._dialogService.confirm({
      title: 'Confirm Deactive',
      body: 'Are you sure you want to deactive?',
    }).afterClosed$;
  }
}
