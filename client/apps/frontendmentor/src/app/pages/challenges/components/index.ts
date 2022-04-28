import { ChallengeListComponent } from './challenge-list.component';
import * as fromDropdown from './dropdown';
import { LearnAboutChallengeComponent } from './learn-about-challenge.component';
import { SelectedFilterListComponent } from './selected-filter-list.component';

export { LearnAboutChallengeComponent } from './learn-about-challenge.component';

export const COMPONENTS = [
  ChallengeListComponent,
  LearnAboutChallengeComponent,
  SelectedFilterListComponent,
  ...fromDropdown.COMPONENTS,
];
