import { initialFavoriteState, FavoriteState } from '../states/favorite.state';
import { createReducer, on } from '@ngrx/store';
import {
    loadingBaseState,
    loadedBaseState,
    errorBaseState,
} from '../states/base.state';
import {
    LoadFavorite,
    LoadFavoriteSuccess,
    LoadFavoriteFail,
} from '../actions/favorite.actions';

export const reducer = createReducer(
    initialFavoriteState,
    on(LoadFavorite, state => ({
        ...state,
        ...loadingBaseState,
    })),
    on(LoadFavoriteSuccess, (state, { chartFavorite }) => ({
        ...state,
        ...loadedBaseState,
        chartFavorite,
    })),
    on(LoadFavoriteFail, (state, { error }) => ({
        ...state,
        ...errorBaseState,
        error,
    }))
);

export function favoriteReducer(state, action): FavoriteState {
    return reducer(state, action);
}
