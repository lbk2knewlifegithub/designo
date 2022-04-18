import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ButtonsComponent } from "./buttons.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  HamburgerModule,
  NeonButtonModule,
  OrderCompleteModule,
  PaperPlaneModule,
  SkewButtonModule,
  SmashToSubmitModule,
  TrashButtonModule,
  WaterWaveButtonModule
} from "@lbk/shared/components/buttons";
import { BuddyButtonModule } from "@lbk/shared/components/buttons";


@NgModule({
  declarations: [ButtonsComponent],
  imports: [
    RouterModule.forChild([{
      path: "",
      component: ButtonsComponent
    }]),
    CommonModule,
    MatGridListModule,
    MatTooltipModule,
    WaterWaveButtonModule,
    SkewButtonModule,
    SmashToSubmitModule,
    TrashButtonModule,
    OrderCompleteModule,
    PaperPlaneModule,
    NeonButtonModule,
    BuddyButtonModule,
    HamburgerModule
  ]
})
export class ButtonsModule {
}
