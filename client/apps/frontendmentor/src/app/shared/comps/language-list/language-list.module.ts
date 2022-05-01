import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LanguageListComponent } from './language-list.component';
import { LanguageComponent } from './language.component';

const COMPONENTS = [LanguageListComponent, LanguageComponent];
@NgModule({
  imports: [CommonModule],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class LanguageListModule {}
