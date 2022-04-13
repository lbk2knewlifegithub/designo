import { AttributionModule } from '@lbk/comps';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BottomSheetModule } from '@lbk/comps';
import { StoreModule } from '@ngrx/store';
import { COMPONENTS } from './components';
import { AppComponent } from './containers';
import { coreFeature } from './state';
import { AlertModule } from '@lbk/comps';

const CONTAINERS = [AppComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Stores
    StoreModule.forFeature(coreFeature),
    // Shared Components from Libs
    BottomSheetModule,
    AttributionModule,
    AlertModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CoreModule {}
