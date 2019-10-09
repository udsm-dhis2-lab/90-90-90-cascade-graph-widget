import { BaseState, initialBaseState } from './base.state';
import { Favorite } from 'src/app/core/models/favorite.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface FavoriteState extends BaseState, EntityState<Favorite> {
    chartFavorite: Favorite;
}

export const adapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

export const initialFavoriteState: FavoriteState = adapter.getInitialState({
    ...initialBaseState,
    chartFavorite: null,
});
