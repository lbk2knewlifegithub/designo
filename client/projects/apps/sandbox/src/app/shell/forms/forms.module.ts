import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BasicLoginFormModule, LoginNeonModule, SignupNeomorphicModule } from '@lbk/shared/components/forms';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [FormsComponent],
  exports: [FormsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: FormsComponent
    }]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BasicLoginFormModule,
    MatTooltipModule,
    LoginNeonModule,
    SignupNeomorphicModule
  ]
})
export class FormsModule {
}
