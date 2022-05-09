import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent } from './components';
import { AppComponent } from './containers';

const COMPONENTS = [FooterComponent, HeaderComponent];
const CONTAINERS = [AppComponent];

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [COMPONENTS, CONTAINERS],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule {}
