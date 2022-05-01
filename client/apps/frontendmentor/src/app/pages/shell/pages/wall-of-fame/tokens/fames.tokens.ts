import { InjectionToken } from '@angular/core';
import { FamesService } from '../services';

export const FAMES_SERVICE = new InjectionToken<FamesService>('Fames Service');
