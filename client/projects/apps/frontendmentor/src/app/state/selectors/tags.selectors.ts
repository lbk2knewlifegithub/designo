import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTags from '../reducers/tags.reducer';

/**
 * - Select Tags Entities State
 */
export const selectTagsEntitiesState = createFeatureSelector<fromTags.State>(
  fromTags.tagsFeatureKey
);

export const {
  /**
   * - Select All Tags
   */
  selectAll: selectAllTags,
} = fromTags.adapter.getSelectors(selectTagsEntitiesState);

/**
 * - Select Loaded
 */
export const selectLoaded = createSelector(
  selectTagsEntitiesState,
  fromTags.getLoaded
);

/**
 * - Select Loading
 */
export const selectLoading = createSelector(
  selectTagsEntitiesState,
  fromTags.getLoading
);
