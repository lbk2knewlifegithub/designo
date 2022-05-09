import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import {
  ActivityPreviewModule,
  SolutionPreviewModule,
  SubHeaderModule,
} from '@lbk/fm/shared';
import { COMPONENTS } from './components';
import {
  ProfileCommentsPageComponent,
  ProfileOverviewPageComponent,
  ProfileSolutionsPageComponent,
  ShellComponent,
} from './containers';
import { ProfileRoutingModule } from './profile-routing.module';

const CONTAINERS = [
  ShellComponent,
  ProfileCommentsPageComponent,
  ProfileOverviewPageComponent,
  ProfileSolutionsPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From FrontendMentor
    SubHeaderModule,
    SolutionPreviewModule,
    ActivityPreviewModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ProfileModule {}
