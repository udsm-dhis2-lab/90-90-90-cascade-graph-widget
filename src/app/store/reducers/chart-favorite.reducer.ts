import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Favorite } from 'src/app/core/models/favorite.model';
import {
    // FavoritesActionTypes,
    // FavoriteActionsDef,
    LoadDashboardFavorite,
    LoadDashboardFavoriteSuccess,
    LoadDashboardFavoriteFail,
} from '../actions/favorite.actions';
import { initialFavoriteState, FavoriteState } from '../states/favorite.state';
import { createReducer, on } from '@ngrx/store';
import { loadingBaseState, loadedBaseState, errorBaseState } from '../states/base.state';

export const reducer = createReducer(
    initialFavoriteState,
    on(LoadDashboardFavorite, state => ({
        ...state,
        ...loadingBaseState
    })),
    on(LoadDashboardFavoriteSuccess, (state, { chartFavorite }) => ({
        ...state,
        ...loadedBaseState,
        chartFavorite
    })),
    on(LoadDashboardFavoriteFail, (state, { error }) => ({
        ...state,
        ...errorBaseState,
        error
    }))
);

export function favoriteReducer(state, action): FavoriteState {
    return reducer(state, action);
}
