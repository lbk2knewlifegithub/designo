import {
  animate,
  animation,
  AnimationTriggerMetadata,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { useAnimationIncludingChildren } from '../common';
import {
  AnimationOptions,
  DEFAULT_ANIMATION_OPTIONS,
} from '../common/anim-options.model';

export interface ISlideOutDownAnimationOptions extends AnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const DEFAULT_SLIDE_OUT_DOWN_ANIMATION_OPTIONS: ISlideOutDownAnimationOptions =
  {
    ...DEFAULT_ANIMATION_OPTIONS,
    translate: '100%',
  };

/**
 * - Slide Out Down
 * @param options
 */
export function slideOutDown(
  options?: ISlideOutDownAnimationOptions
): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_SLIDE_OUT_DOWN_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing, translate } = options;

  return trigger(anchor || 'slideOutDown', [
    transition(
      ':leave',
      [
        ...useAnimationIncludingChildren(
          // Animations
          animation([
            animate(
              '{{duration}}ms {{delay}}ms {{easing}}',
              keyframes([
                style({
                  transform: 'translate3d(0, 0, 0)',
                  easing: 'ease',
                  offset: 0,
                }),
                style({
                  transform: 'translate3d(0, {{translate}}, 0)',
                  visibility: 'hidden',
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
