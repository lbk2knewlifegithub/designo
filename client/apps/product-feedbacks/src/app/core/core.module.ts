import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule, AttributionModule, BottomSheetModule } from '@lbk/comps';
import { COMPONENTS } from './components';
import { AppComponent } from './containers';

const CONTAINERS = [AppComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components from Libs
    BottomSheetModule,
    AttributionModule,
    AlertModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CoreModule {}
