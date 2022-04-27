import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from '@lbk/comps';
import { TechModule } from '../tech.component';
import { ChallengePreviewComponent } from './challenge-preview.component';
import { LevelComponent } from './level/level.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components From FrontendMentor
    TechModule,
    ImageModule,
  ],
  exports: [ChallengePreviewComponent, LevelComponent],
  declarations: [ChallengePreviewComponent, LevelComponent],
})
export class ChallengePreviewModule {}
