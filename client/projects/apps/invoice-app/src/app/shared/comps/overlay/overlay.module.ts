import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoBackModule } from '../go-back.component';
import { OverlayComponent } from './overlay.component';

@NgModule({
  imports: [
    CommonModule,
    // Shared Components From Invoices
    GoBackModule,
  ],
  exports: [OverlayComponent],
  declarations: [OverlayComponent],
})
export class OverlayModule {}
