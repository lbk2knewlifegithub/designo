import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenusComponent } from './menus.component';
import { RouterModule } from '@angular/router';
import { MenuCurveModule } from '@lbk/shared/components/menus';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [MenusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: MenusComponent
    }]),
    MenuCurveModule,
  ]
})
export class MenusModule {
}
