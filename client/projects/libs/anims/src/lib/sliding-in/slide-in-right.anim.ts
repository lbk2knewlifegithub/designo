import {
  animate,
  animation,
  AnimationTriggerMetadata,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

import {
  AnimationOptions,
  DEFAULT_ANIMATION_OPTIONS,
  useAnimationIncludingChildren,
} from '../common';

interface ISlideInRightAnimationOptions extends AnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const DEFAULT_SLIDE_IN_RIGHT_ANIMATION_OPTIONS: ISlideInRightAnimationOptions =
  {
    ...DEFAULT_ANIMATION_OPTIONS,
    translate: '100%',
  };

/**
 * - Slide In Right
 * @param options
 */
export function slideInRight(
  options?: ISlideInRightAnimationOptions
): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_SLIDE_IN_RIGHT_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing, translate } = options;

  return trigger(anchor || 'slideInRight', [
    transition(
      ':enter',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(
          // Animations
          animation([
            animate(
              '{{duration}}ms {{delay}}ms {{easing}}',
              keyframes([
                style({
                  visibility: 'visible',
                  transform: 'translate3d({{translate}}, 0, 0)',
                  easing: 'ease',
                  offset: 0,
                }),
                style({
                  transform: 'translate3d(0, 0, 0)',
                  easing: 'ease',
                  offset: 1,
                }),
              ])
            ),
          ]),
          options
        ),
      ],
      // Params
      {
        params: {
          delay,
          duration,
          translate,
          easing,
        },
      }
    ),
  ]);
}
