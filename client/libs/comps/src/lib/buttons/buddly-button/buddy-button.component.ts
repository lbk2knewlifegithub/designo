import { Component } from '@angular/core';

@Component({
  selector: 'lbk-buddy-button',
  templateUrl: './buddy-button.component.html',
  styleUrls: ['./buddy-button.component.scss'],
})
export class BuddyButtonComponent {
  onBuddy(button: HTMLButtonElement) {
    //reset animation
    button.classList.remove('animate');

    button.classList.add('animate');

    setTimeout(function () {
      button.classList.remove('animate');
    }, 700);
  }
}
