import { Directive, HostListener, NgModule } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[credit-card]',
})
export class CreditCardDirective {
  @HostListener('input', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    const numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');
  }
}

@NgModule({
  exports: [CreditCardDirective],
  declarations: [CreditCardDirective],
})
export class CreditCardModule {}
