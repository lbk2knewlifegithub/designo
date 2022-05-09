import * as fromDesignComparison from './design-comparison';
import { HeroComponent } from './hero/hero.component';
import { ReportComponent } from './report.component';
import { QuestionsComponent } from './questions.component';

export const COMPONENTS = [
  HeroComponent,
  fromDesignComparison.COMPONENTS,
  ReportComponent,
  QuestionsComponent,
];
