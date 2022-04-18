import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingsComponent } from './loadings.component';
import { LoadingComponent } from './loading/loading.component';
import {
  FillSquareModule,
  FlipLoadingModule,
  FourSquareModule, GradientStrokeAndBoundLoadingModule,
  HeadTouchRearCircleModule, LiquidCircleModule, LiquidCircleV2Module, LiquidCircleV3Module,
  LoadingWavyModule,
  SnakeMoveSquareModule, ThreeBlockMoveModule, ThreeDotModule,
  TwoSnakeMoveSquareModule
} from '@lbk/shared/components/loadings';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [LoadingComponent, LoadingsComponent],
  exports: [LoadingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LoadingsComponent
    }]),
    LoadingWavyModule,
    FourSquareModule,
    MatGridListModule,
    MatTooltipModule,
    TwoSnakeMoveSquareModule,
    HeadTouchRearCircleModule,
    FlipLoadingModule,
    SnakeMoveSquareModule,
    ThreeBlockMoveModule,
    LiquidCircleModule,
    FillSquareModule,
    ThreeDotModule,
    LiquidCircleV2Module,
    LiquidCircleV3Module,
    GradientStrokeAndBoundLoadingModule
  ]
})
export class LoadingsModule {
}
