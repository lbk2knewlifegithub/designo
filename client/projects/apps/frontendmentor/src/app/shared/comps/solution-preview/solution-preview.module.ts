import { AvatarPipeModule, ScreenshotPipeModule } from '@lbk/pipes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from '@lbk/comps';
import { DifficultyModule } from '../difficulty/difficulty.component';
import { LanguageListModule } from '../language-list';
import { NumberOfModule } from '../number-of.component';
import { SolutionPreviewComponent } from './solution-preview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Pipes from Libs
    AvatarPipeModule,
    ScreenshotPipeModule,
    // Shared Components from FrontendMentor
    LanguageListModule,
    DifficultyModule,
    NumberOfModule,
    ImageModule,
  ],
  exports: [SolutionPreviewComponent],
  declarations: [SolutionPreviewComponent],
})
export class SolutionPreviewModule {}
