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

export interface IFadeOutLeftAnimationOptions extends AnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const DEFAULT_FADE_OUT_LEFT_ANIMATION_OPTIONS: IFadeOutLeftAnimationOptions = {
  ...DEFAULT_ANIMATION_OPTIONS,
  translate: '100%',
};

/**
 * - Fade Out Left
 * @param options
 */
export function fadeOutLeft(
  options?: IFadeOutLeftAnimationOptions
): AnimationTriggerMetadata {
  options = { ...DEFAULT_FADE_OUT_LEFT_ANIMATION_OPTIONS, ...options };
  const { anchor, delay, duration, easing, translate } = options;

  return trigger(anchor || 'fadeOutLeft', [
    transition(
      ':leave',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(
          // Animations
          animation([
            animate(
              '{{duration}}ms {{delay}}ms {{easing}}',
              keyframes([
                style({
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0)',
                  easing: 'ease',
                  offset: 0,
                }),
                style({
                  opacity: 0,
                  transform: 'translate3d(-{{translate}}, 0, 0)',
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
