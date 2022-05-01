import { AspiringDeveloperComponent } from './aspiring-developer.component';
import { HeroComponent } from './hero.component';
import { FileAccessComponent } from './more/file-access.component';
import { HireMeButtonComponent } from './more/hire-me-button.component';
import { MoreComponent } from './more/more.component';
import { PrivateSolutionsComponent } from './more/private-solutions.component';
import { UnlimitedScreenshotsComponent } from './more/unlimited-screenshots.component';
import { PaymentsComponent } from './payments.component';
import { PremiumChallengesComponent } from './premium-challenges.component';
import { FreeComponent } from './pricing/free.component';
import { MonthlyComponent } from './pricing/monthly.component';
import { PricingComponent } from './pricing/pricing.component';
import { YearlyComponent } from './pricing/yearly.component';
import { ProDeveloperComponent } from './pro-developer.component';
import { TestimonialComponent } from './testimonial.component';
import { WhyProDeveloperComponent } from './why-pro.component';

export { Testimonial } from './testimonial.component';

export const COMPONENTS = [
  TestimonialComponent,
  HeroComponent,
  AspiringDeveloperComponent,
  ProDeveloperComponent,
  WhyProDeveloperComponent,
  PremiumChallengesComponent,
  // More
  MoreComponent,
  FileAccessComponent,
  PrivateSolutionsComponent,
  UnlimitedScreenshotsComponent,
  HireMeButtonComponent,
  // Pricing
  PricingComponent,
  FreeComponent,
  YearlyComponent,
  MonthlyComponent,

  PaymentsComponent,
];
