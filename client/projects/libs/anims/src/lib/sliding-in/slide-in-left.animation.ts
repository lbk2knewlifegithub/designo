import {
  animate,
  animation,
  AnimationTriggerMetadata,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { AnimationOptions } from '../common/anim-options.model';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface ISlideInLeftAnimationOptions extends AnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

export const slideInLeft = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'translate3d(-{{translate}}, 0, 0)',
          easing: 'ease',
          offset: 0,
        }),
        style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
      ])
    ),
  ]);

const DEFAULT_DURATION = 1000;

export function slideInLeftOnEnterAnimation(
  options?: ISlideInLeftAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'slideInLeftOnEnter', [
    transition(
      ':enter',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(slideInLeft(), options),
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          translate: (options && options.translate) || '100%',
        },
      }
    ),
  ]);
}
