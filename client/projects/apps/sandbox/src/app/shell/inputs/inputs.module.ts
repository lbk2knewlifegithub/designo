import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    InputsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: InputsComponent
    }]),
  ]
})
export class InputsModule {
}
