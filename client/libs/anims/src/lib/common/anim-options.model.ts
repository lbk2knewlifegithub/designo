/**
 * - Animation Options
 */
export interface AnimationOptions {
  /**
   * Name of the animation anchor that will be used in a template
   */
  anchor?: string;
  /**
   * Duration in ms
   */
  duration?: number;
  /**
   * Delay in ms
   *
   * Default: 0
   */
  delay?: number;
  /**
   * This parameter can only be set in a component's decorator.
   * Cannot be set in a template.
   *
   * Whether children animation should run 'before', 'together' or 'after' animation.
   * When set to 'none' chldren are not animated.
   *
   * Default: 'together'
   */
  animateChildren?: 'before' | 'together' | 'after' | 'none';

  /**
   * - Easing
   */
  easing?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export const DEFAULT_ANIMATION_OPTIONS: AnimationOptions = {
  delay: 0,
  duration: 300,
  easing: 'ease-in-out',
  animateChildren: 'together',
};
