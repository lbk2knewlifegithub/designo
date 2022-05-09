import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmPasswordInputComponent } from './confirm-password.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ConfirmPasswordInputComponent],
  declarations: [ConfirmPasswordInputComponent],
})
export class ConfirmPasswordInputModule {}
