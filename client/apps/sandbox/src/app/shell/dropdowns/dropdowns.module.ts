import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DropdownsComponent } from "./dropdowns.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BasicDropdownModule } from "@lbk/shared/components/dropdowns";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: DropdownsComponent
    }]),
    MatGridListModule,
    MatTooltipModule,
    BasicDropdownModule
  ],
  declarations: [
    DropdownsComponent
  ]
})
export class DropdownsModule {
}
