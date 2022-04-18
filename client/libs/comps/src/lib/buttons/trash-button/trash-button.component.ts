import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbk-trash-button',
  templateUrl: './trash-button.component.html',
  styleUrls: ['./trash-button.component.scss']
})
export class TrashButtonComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  onButtonClick(button: HTMLButtonElement) {
    if (!button.classList.contains('delete')) {
      button.classList.add('delete');
      setTimeout(() => button.classList.remove('delete'), 3200);
    }
  }
}
