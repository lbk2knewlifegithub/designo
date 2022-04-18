import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbk-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  links: string[] = ['fuck', 'abc'];
  activeLink = this.links[0];

  constructor() {
  }

  ngOnInit(): void {
  }

}
