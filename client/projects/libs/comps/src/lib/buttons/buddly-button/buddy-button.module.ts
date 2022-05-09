import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BuddyButtonComponent } from "./buddy-button.component";


@NgModule({
  declarations: [
    BuddyButtonComponent
  ],
  exports: [
    BuddyButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BuddyButtonModule {
}
