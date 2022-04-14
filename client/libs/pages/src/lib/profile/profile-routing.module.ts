import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@lbk/auth';
import { ProfilePageComponent } from './containers';
import { UserExistsGuard, ProfilePageCanDeactiveGuard } from './guards';

const routes: Routes = [
  {
    path: ':username',
    component: ProfilePageComponent,
    canActivate: [AuthGuard, UserExistsGuard],
    canDeactivate: [ProfilePageCanDeactiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
