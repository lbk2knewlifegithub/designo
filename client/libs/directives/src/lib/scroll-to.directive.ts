import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[scrollTo]' })
export class ScrollToDirective implements OnInit {
  @Input() delay = 500;
  @Input() behavior: 'smooth' | 'auto' = 'auto';

  constructor(private ref: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.ref.nativeElement.scrollIntoView({ behavior: this.behavior });
    }, this.delay);
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [ScrollToDirective],
  declarations: [ScrollToDirective],
})
export class ScrollToModule {}
