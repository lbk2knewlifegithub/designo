import { Component } from '@angular/core';
import { SiblingTab } from '@lbk/shared/components/tabs';

@Component({
  selector: 'lbk-page-not-founds',
  templateUrl: './page-not-founds.component.html',
  styleUrls: ['./page-not-founds.component.scss']
})
export class PageNotFoundsComponent {
  tabs: SiblingTab[] = [
    new SiblingTab(
      {
        label: 'Home',
        link: '/'
      }
    ),
    new SiblingTab(
      {
        label: 'Astronaut',
        link: '/astronaut'
      }
    )
  ];
}
