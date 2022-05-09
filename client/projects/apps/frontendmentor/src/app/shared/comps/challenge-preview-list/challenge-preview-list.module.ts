import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from '@lbk/comps';
import { ChallengeTypeModule } from '../challenge-type.component';
import { DifficultyModule } from '../difficulty/difficulty.component';
import { LanguageListModule } from '../language-list';
import { ChallengePreviewListComponent } from './challenge-preview-list.component';
import { ChallengePreviewComponent } from './challenge-preview/challenge-preview.component';

const COMPONENTS = [ChallengePreviewListComponent, ChallengePreviewComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components From FrontendMentor
    LanguageListModule,
    ImageModule,
    DifficultyModule,
    ChallengeTypeModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class ChallengePreviewListModule {}
