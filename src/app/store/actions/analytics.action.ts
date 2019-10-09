import { createAction, props, Action } from '@ngrx/store';
import { Analytics } from 'src/app/core/models/analytics.model';

export enum FavoriteActionTypes {
    LoadFavoriteAnalytics = '[DASHBOARD FAVORITES ANALYTICS] Load Dashboard Favorites',
    LoadFavoriteAnalyticsSuccess = '[DASHBOARD FAVORITES ANALYTICS] Load Dashboard Favorite Success',
    LoadFavoriteAnalyticsFail = '[DASHBOARD FAVORITES ANALYTICS] Load Dashboard Favorite Fail',
}

export class LoadFavoriteAnalytics implements Action {
    readonly type = FavoriteActionTypes.LoadFavoriteAnalytics;
    constructor(public payload: Analytics) { }
}

export class LoadFavoriteAnalyticsSuccess implements Action {
    readonly type = FavoriteActionTypes.LoadFavoriteAnalyticsSuccess;
    constructor(public payload: Analytics) { }
}

export class LoadFavoriteAnalyticsFail implements Action {
    readonly type = FavoriteActionTypes.LoadFavoriteAnalyticsFail;
    constructor(public payload: string) { }
}
