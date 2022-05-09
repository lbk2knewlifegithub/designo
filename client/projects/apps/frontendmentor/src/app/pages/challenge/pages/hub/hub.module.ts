import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubHeaderModule } from '@lbk/fm/shared';
import { HubPageComponent } from './containers';
import { HubRoutingModule } from './hub-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HubRoutingModule,
    // Shared Components From FrontendMentor
    SubHeaderModule,
  ],
  declarations: [HubPageComponent],
})
export class HubModule {}
