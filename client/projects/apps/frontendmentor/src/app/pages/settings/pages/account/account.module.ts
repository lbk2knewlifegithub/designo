import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { AccountRoutingModule } from './account-routing.module';
import { COMPONENTS } from './components';
import { AccountPageComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,
  ],
  declarations: [COMPONENTS, AccountPageComponent],
})
export class AccountModule {}
