import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BumpAnimatedTabBarModule, SiblingTabModule } from '@lbk/shared/components/tabs';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabsComponent
      }
    ]),
    MatTooltipModule,
    SiblingTabModule,
    BumpAnimatedTabBarModule,
    MatTabsModule
  ]
})
export class TabsModule {
}
