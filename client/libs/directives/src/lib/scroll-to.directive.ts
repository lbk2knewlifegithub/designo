import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Input, NgModule, OnInit } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[scrollTo]' })
export class ScrollToDirective implements OnInit {
  @Input() delay = 500;
  @Input() behavior: 'smooth' | 'auto' = 'auto';
  @Input('scrollTo') position?: number | 'center' = 100;

  constructor(private ref: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (typeof this.position === 'number') {
        const elementPostion =
          this.ref.nativeElement.getBoundingClientRect().top;
        const offsetPosition = elementPostion - this.position;
        window.scrollTo({
          top: offsetPosition,
        });
        return;
      }

      if (typeof this.position === 'string' && this.position === 'center') {
        this.ref.nativeElement.scrollIntoView({
          behavior: this.behavior,
          inline: 'center',
          block: 'center',
        });
        return;
      }
    }, this.delay);
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [ScrollToDirective],
  declarations: [ScrollToDirective],
})
export class ScrollToModule {}
