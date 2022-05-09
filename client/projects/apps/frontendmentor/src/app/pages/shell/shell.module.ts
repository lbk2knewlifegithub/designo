import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { QuestionListModule, SubHeaderModule } from '../../shared';
import { ShellPageComponent } from './containers';
import { ShellRoutingModule } from './shell-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ShellRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,
    // Shared Components From FrontendMentor
    QuestionListModule,
    SubHeaderModule,
  ],
  declarations: [ShellPageComponent],
})
export class ShellModule {}
