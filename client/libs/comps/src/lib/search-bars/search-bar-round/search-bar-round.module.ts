import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarRoundComponent } from './search-bar-round.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
    SearchBarRoundComponent
  ],
  exports: [
    SearchBarRoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    TypeaheadModule
  ]
})
export class SearchBarRoundModule {
}
