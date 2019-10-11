import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { FavoriteState, adapter } from '../states/favorite.state';

export const getFavoriteSnapshot = createSelector(
    getRootState,
    (state: State) => state.favorite
);

export const {
    selectEntities: getFavoriteEntities,
    selectAll: getAllFavorites,
    selectIds: getFavoriteIds,
    selectTotal: getTotalFavorites,
} = adapter.getSelectors(getFavoriteSnapshot);

export const getFavorites = createSelector(
    getFavoriteSnapshot,
    (favoriteState: FavoriteState) => favoriteState.chartFavorite
);


export const getFavoriteLoading = createSelector(
    getFavoriteSnapshot,
    (favoriteState: FavoriteState) => favoriteState.loading
);

export const getFavoriteLoaded = createSelector(
    getFavoriteSnapshot,
    (favoriteState: FavoriteState) => favoriteState.loaded
);

export const getFavoriteHasError = createSelector(
    getFavoriteSnapshot,
    (favoriteState: FavoriteState) => favoriteState.hasError
);

export const getFavoriteError = createSelector(
    getFavoriteSnapshot,
    (favoriteState: FavoriteState) => favoriteState.error
);
