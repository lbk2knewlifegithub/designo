import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZippyContentDirective } from './zippy-content.directive';
import { ZippyToggleDirective } from './zippy-toggle.directive';
import { ZippyComponent } from './zippy.component';

const DIRECTIVES = [ZippyToggleDirective, ZippyContentDirective];
@NgModule({
  imports: [CommonModule],
  declarations: [ZippyComponent, DIRECTIVES],
  exports: [ZippyComponent, DIRECTIVES],
})
export class ZippyModule {}
