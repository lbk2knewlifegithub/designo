import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from './password-input.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PasswordInputComponent],
  declarations: [PasswordInputComponent],
})
export class PasswordInputModule {}
