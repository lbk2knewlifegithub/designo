import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './containers';

// import { COMPONENTS } from './components';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AppComponent],
})
export class CoreModule {}
