import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttributionModule } from '@lbk/comps';
import { COMPONENTS } from './components';
import { AppComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components from Libs
    AttributionModule,
  ],
  declarations: [COMPONENTS, AppComponent],
})
export class CoreModule {}
