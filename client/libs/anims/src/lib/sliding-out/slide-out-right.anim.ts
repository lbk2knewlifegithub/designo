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

interface ISlideOutRightAnimationOptions extends AnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const DEFAULT_SLIDE_OUT_RIGHT_ANIMATION_OPTIONS: ISlideOutRightAnimationOptions =
  {
    ...DEFAULT_ANIMATION_OPTIONS,
    translate: '100%',
  };

/**
 * - Slide Out Right
 * @param options
 */
export function slideOutRight(
  options?: ISlideOutRightAnimationOptions
): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_SLIDE_OUT_RIGHT_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing, translate } = options;

  return trigger(anchor || 'slideOutRight', [
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
                  transform: 'translate3d({{translate}}, 0, 0)',
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
