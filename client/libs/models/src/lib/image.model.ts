/**
 * - Responsive Image
 */
export interface Image {
  /**
   * - Mobile Image
   */
  mobile?: string;

  /**
   * - Tablet Image
   */
  tablet?: string;

  /**
   * - Desktop Image
   */
  desktop?: string;

  /**
   * - Alternative Image
   */
  alt: string;
}

export const identifyImage = (index: number, image: Image) => {
  return image.alt;
};
