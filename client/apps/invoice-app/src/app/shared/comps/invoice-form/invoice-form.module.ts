import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { COMPONENTS } from './components';
import { InvoiceFormComponent } from './containers/invoice-form.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [COMPONENTS, InvoiceFormComponent],
  exports: [InvoiceFormComponent],
})
export class InvoiceFormModule {}
