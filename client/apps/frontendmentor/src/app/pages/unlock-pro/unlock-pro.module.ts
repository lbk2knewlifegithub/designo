import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { FeatureModule, QuestionListModule, SlackModule } from '../../shared';
import { COMPONENTS } from './components';
import { UnlockProPageComponent } from './containers';
import { UnlockProRoutingModule } from './unlock-pro-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UnlockProRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From FrontendMentor
    QuestionListModule,
    SlackModule,
    FeatureModule,
  ],
  declarations: [COMPONENTS, UnlockProPageComponent],
})
export class UnlockProModule {}
