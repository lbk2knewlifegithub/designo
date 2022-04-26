import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SubHeaderModule, TechModule } from '../../shared';
import { COMPONENTS } from './components';
import { ResourcesPageComponent } from './containers';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesEffects, resourcesFeature } from './state';

@NgModule({
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    // Stores
    StoreModule.forFeature(resourcesFeature),
    EffectsModule.forFeature([ResourcesEffects]),

    // Shared Directives From Libs
    ScrollToModule,

    // Shared Directives From FrontendMentor
    SubHeaderModule,
    TechModule,
  ],
  declarations: [COMPONENTS, ResourcesPageComponent],
})
export class ResourcesModule {}
