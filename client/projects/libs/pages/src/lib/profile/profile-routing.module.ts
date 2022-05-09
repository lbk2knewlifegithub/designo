import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustLoggedInGuard } from '@lbk/auth';
import { ProfilePageComponent } from './containers';
import { ProfilePageCanDeactiveGuard, UserExistsGuard } from './guards';

const routes: Routes = [
  {
    path: ':username',
    component: ProfilePageComponent,
    canActivate: [MustLoggedInGuard, UserExistsGuard],
    canDeactivate: [ProfilePageCanDeactiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
