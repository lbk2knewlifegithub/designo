import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropDownComponent } from './dropdown.component';
import { DropDownContentDirective } from './dropdown-content.directive';
import { DropDownToggleDirective } from './dropdown-toggle.directive';

const DIRECTIVES = [DropDownToggleDirective, DropDownContentDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [DropDownComponent, DIRECTIVES],
  exports: [DropDownComponent, DIRECTIVES],
})
export class DropDownModule {}
