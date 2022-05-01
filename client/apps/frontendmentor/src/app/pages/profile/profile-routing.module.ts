import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ProfileCommentsPageComponent,
  ProfileOverviewPageComponent,
  ProfileSolutionsPageComponent,
  ShellComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: ProfileOverviewPageComponent,
      },
      {
        path: 'solutions',
        component: ProfileSolutionsPageComponent,
      },
      {
        path: 'comments',
        component: ProfileCommentsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
