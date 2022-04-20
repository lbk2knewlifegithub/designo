import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarPipeModule } from '@lbk/pipes';
import { ProfileButtonComponent } from './profile-button.component';

@NgModule({
  imports: [
    CommonModule,
    // Shared Components From Libs
    AvatarPipeModule,
  ],
  exports: [ProfileButtonComponent],
  declarations: [ProfileButtonComponent],
})
export class ProfileButtonModule {}
