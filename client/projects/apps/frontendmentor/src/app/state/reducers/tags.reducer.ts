import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Tag } from '../../shared';
import { TagsActions, TagsAPIActions } from '../actions';

export const tagsFeatureKey = 'tags';

export interface State extends EntityState<Tag> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Tag> = createEntityAdapter<Tag>({
  selectId: (tag: Tag) => tag.id,
  sortComparer: (t1, t2) => t1.name.localeCompare(t2.name),
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
});

export const reducer = createReducer(
  initialState,

  /**
   * - Load Tags
   */
  on(TagsActions.loadTags, (state) => ({
    ...state,
    loading: true,
  })),

  /**
   * - Load Tags Success
   */
  on(TagsAPIActions.loadTagsSuccess, (state, { tags }) =>
    adapter.addMany(tags, { ...state, loaded: true, loading: false })
  ),

  /**
   * - Load Tags Failure
   */
  on(TagsAPIActions.loadTagsFailure, (state, { error }) => ({
    ...state,
    error,
    loaded: false,
    loading: false,
  }))
);

// Gets
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
