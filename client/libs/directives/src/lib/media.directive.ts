import { CommonModule } from '@angular/common';
import {
  Directive,
  Input,
  NgModule,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

/**
 * - Media directive
 * <lbk-nav-edu *media="'(min-width:400px)'"></lbk-nav-edu>
 */
// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[media]' })
export class MediaDirective {
  @Input() set media(query: string) {
    // cleanup old listener
    if (this.removeListener) {
      this.removeListener();
    }
    this.setListener(query);
  }

  private hasView = false;
  private removeListener?: () => void;

  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly template: TemplateRef<any>
  ) {}

  private setListener(query: string) {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: any) => {
      // create view if true and not created already
      if (event.matches && !this.hasView) {
        this.hasView = true;
        this.viewContainer.createEmbeddedView(this.template);
      }
      // destroy view if false and created
      if (!event.matches && this.hasView) {
        this.hasView = false;
        this.viewContainer.clear();
      }
    };
    mediaQueryList.addEventListener('change', listener);
    // add cleanup listener
    this.removeListener = () =>
      mediaQueryList.removeEventListener('change', listener);
  }
}

@NgModule({
  declarations: [MediaDirective],
  exports: [MediaDirective],
  imports: [CommonModule],
})
export class MediaModule {}
