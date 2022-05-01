import * as fromBIOInputGroup from './bio-input-group';
import { HireMeInputComponent } from './hire-me-input.component';
import * as fromLinksInputGroup from './links-input-group';
import { LinksComponent } from './links.component';
import { UserFormComponent } from './user-form.component';

export const COMPONENTS = [
  LinksComponent,
  UserFormComponent,
  HireMeInputComponent,
  ...fromBIOInputGroup.COMPONENTS,
  ...fromLinksInputGroup.COMPONENTS,
];
